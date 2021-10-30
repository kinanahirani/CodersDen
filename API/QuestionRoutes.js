import express from 'express';
import db from './db.js';
import { getLoggedInUser } from './UserFunctions.js';
const QuestionRoutes = express.Router();

QuestionRoutes.post('/questions', (req, res) => {
    const { title, content } = req.body;
    const tagIds = req.body.tags;
    const { token } = req.cookies;
    db
        .select('userid')
        .from('users')
        .where({ token })
        .first()
        .then(user => {
            console.log(user);
            if (user && user.userid) {
                db('questions')
                    .insert({
                        title,
                        content,
                        userid: user.userid
                    })
                    .then(questionId => {
                        const questionTags = [];
                        tagIds.forEach(tagId => {
                            questionTags.push({ question_id: questionId, tag_id: tagId });
                        });
                        db('question_tags').insert(questionTags)
                            .then(() => res.json(questionId).sendStatus(201))
                            .catch(() => res.sendStatus(422));
                    }).catch(() => res.sendStatus(422));
            }
            else {
                res.sendStatus(403);
            }
        })
})

QuestionRoutes.get('/questionpage/:id', (req, res) => {
    const id = req.params.id;
    getLoggedInUser(req.cookies.token).then(user => {
        db.select('questions.*',
            db.raw('users.email'),
            db.raw('users.fname'),
            db.raw('votes2.vote as user_vote'),
            db.raw('sum(votes.vote) as vote_sum'))
            .from('questions')
            .join('users', 'users.userid', '=', 'questions.userid')
            .leftJoin('votes', 'questions.questionid', '=', 'votes.question_id')
            .leftJoin(db.raw('votes votes2 on votes2.question_id = questions.questionid and votes2.user_id = ' + user.userid))
            .where({ questionid: id })
            .first()
            .then(question => {
                db.select('*')
                    .from('question_tags')
                    .where({ question_id: question.questionid })
                    .join('tags', 'tags.id', '=', 'question_tags.tag_id')
                    .then(tags => {
                        res.json({ question, tags });
                    });
            })
            .catch(e => console.log(e) && res.status(422).send());
    })

})

QuestionRoutes.get('/questions', (req, res) => {
   return  db.select('*')
      .from('questions')
      .orderBy('questionid', 'desc')
      .then(questions => res.json(questions).send())
      .catch(() => res.sendStatus(422));
})

QuestionRoutes.get('/userquestions/:name', (req, res) => {
    const email = req.params.name;
    db
        .select('userid')
        .from('users')
        .where({ email })
        .first()
        .then(user => {
            db
                .select('*')
                .from('questions')
                .where({ userid: user.userid })
                .orderBy('questionid', 'desc')
                .then(questions => res.json(questions).send())
                .catch(() => res.sendStatus(422));
        })
})
export default QuestionRoutes;
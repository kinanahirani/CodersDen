import { useEffect, useState } from 'react';
import Heading from './Heading';
import axios from "axios";
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Tag from './Tag'
import { Link } from 'react-router-dom';
import WhoAndWhen from './WhoAndWhen';
import UserLink from './UserLink';
import VotingButtons from './VotingButtons';
import { createGlobalStyle } from 'styled-components';
import BlueLinkButton from './BlueLinkButton';
import CommentForm from './CommentForm';
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
body{
    font-family: 'Roboto', sans-serif;
    background:#242424;
    color:#fff;
}
`;
const Container = styled.div`
padding: 30px 20px;
`;
const QuestionMeta = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const HeroContainer = styled.div`
height: min(90vh);
display: grid;
grid-template-columns: 250px auto;
`;
const NavUl = styled.ul`
position: sticky;
top: 82px;
display: flex;
flex-direction: column;
`;
const NavLink = styled(Link)`
padding: 11px 15px;
color: #0af05e;
margin: 10px;
border-bottom: 1px solid #454545;
text-decoration:none;
`;
const SideBar = styled.div`
background:#212121;
border-right: 2px solid #00ff5d;
`;
const QuestionTitle = styled.h1`
  border-bottom: 1px solid rgba(255,255,255,.1);
  padding-bottom: 10px;
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
  color:#fff;
  margin:0px;
`;
const PostBody = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 20px;
  margin-bottom: 20px;
`;
const CommentsOuter = styled.div`
border-top: 1px solid rgba(255,255,255,.1);
margin-left: 70px;
`;
const CommentsBox = styled.div`
border-bottom: 1px solid rgba(255,255,255,.1);
padding:20px 0;
font-size: .8rem;
`;
function QuestionPage({ match }) {
    const [question, setQuestion] = useState(false);
    const [tags, setTags] = useState([]);
    const [userVote,setUserVote] = useState(0);
    const [voteCount,setVoteCount] = useState(0);
    const [questionComments,setQuestionComments] = useState([]);
    const [commentForm, setCommentForm] = useState(false);
    function fetchQuestion() {
        axios.get('http://localhost:3030/questionpage/' + match.params.id, {withCredentials:true})
            .then(response => {
                setQuestion(response.data.question);
                const voteSum = response.data.question.vote_sum;
                setVoteCount(voteSum === null ? 0 : voteSum);
                setUserVote(response.data.question.user_vote);
                setTags(response.data.tags);
            })
    }
    function handleOnArrowUpClick(){
        setUserVote(userVote === 1 ? 0 : 1);
        axios.post('http://localhost:3030/vote/up/' + question.questionid,{},{withCredentials:true})
        .then(response => setVoteCount(response.data))
    }
    function handleOnArrowDownClick(){
        setUserVote(userVote === -1 ? 0 : -1);
        axios.post('http://localhost:3030/vote/down/' + question.questionid,{},{withCredentials:true})
        .then(response => setVoteCount(response.data))  
    }
    function getQuestionComments(){
        axios.get('http://localhost:3030/comments/'+ match.params.id,{withCredentials:true})
        .then(response=> setQuestionComments(response.data))
    }
    function handleAddComments(comment){
        axios.post('http://localhost:3030/comments', {comment, postId: question.questionid}, {withCredentials:true})
        .then(response=>setQuestionComments(response.data))
        setCommentForm(false);
    }
    useEffect(() =>{
    fetchQuestion();
    getQuestionComments();
    } 
    , []);
    return (
        <>
            <GlobalStyle />
            <HeroContainer>
                <SideBar>
                    <NavUl>
                        <NavLink to="/QuestionsPage">Home</NavLink>
                        <NavLink to="/userquestions">Your Questions</NavLink>
                        <NavLink>Questions You Answered</NavLink>
                    </NavUl>
                </SideBar>
                <Container>
                    {question && (
                        <>
                            <QuestionTitle>{question.title}</QuestionTitle>
                            <PostBody>
                            <div><VotingButtons total={voteCount}
                            userVote={userVote} 
                            onArrowUpClick={()=>handleOnArrowUpClick}
                            onArrowDownClick={()=>handleOnArrowDownClick}/></div>
                            <div>
                            <ReactMarkdown plugins={[gfm]} children={question.content} />
                            <QuestionMeta>
                                <div>
                                    {tags.map(tag => (
                                        <Tag key={'tag' + tag.id} name={tag.name} />
                                    ))}
                                </div>
                                <WhoAndWhen>x min ago <UserLink>{question.email}</UserLink></WhoAndWhen>
                            </QuestionMeta>
                            </div>
                            </PostBody>
                        </>
                    )}
                    {questionComments && questionComments.length>0 && (
                      <CommentsOuter>
                         {questionComments.map(questionComment=>(
                             <CommentsBox>
                                 {questionComment.comment}
                                 <WhoAndWhen style={{padding: 0, float: 'none'}}>
                                 &nbsp;-&nbsp;
                                 <UserLink>
                                         {questionComment.email}
                                </UserLink>
                                     &nbsp;x time ago 
                                     
                                     </WhoAndWhen>
                                 </CommentsBox>
                         ))} 
                     </CommentsOuter>
                    )}
                    {commentForm && (
                             <CommentForm onAddCommentClick={comment=> handleAddComments(comment)} />
                         )}
                         {!commentForm && (
                             <BlueLinkButton onClick={()=>setCommentForm(true)} 
                             style={{padding: '10px 0'}}>
                                 Add a comment
                                 </BlueLinkButton>
                         )}
                </Container>
            </HeroContainer>

        </>
    )
}
export default QuestionPage;
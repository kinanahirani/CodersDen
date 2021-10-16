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
import { createGlobalStyle } from 'styled-components';
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
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 20px;
  margin-bottom: 20px;
`;
function QuestionPage({ match }) {
    const [question, setQuestion] = useState(false);
    const [tags, setTags] = useState([]);
    function fetchQuestion() {
        axios.get('http://localhost:3030/questionpage/' + match.params.id)
            .then(response => {
                setQuestion(response.data.question);
                setTags(response.data.tags);
            })
    }
    useEffect(() => fetchQuestion(), []);
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
                            <div>voting</div>
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
                </Container>
            </HeroContainer>

        </>
    )
}
export default QuestionPage;
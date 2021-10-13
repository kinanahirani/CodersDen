import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Heading from "./Heading";
import gfm from "remark-gfm";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import axios from "axios";
const GlobalStyle=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
body{
    font-family: 'Roboto', sans-serif;
}
b,strong{
    font-weight:700;
}
p{
    margin:10px;
    line-height:1.5rem;
}
h1,h2{
    margin-top:20px;
    margin-bottom:10px;
}
h1{
    font-size:1.8rem;
}
h2{
    font-size:1.6rem;
}
blockquote{
    background-color:rgba(0,0,0,0.1);
    padding:15px;
    border-radius:4px;
}
`;
const HeroContainer = styled.div`
height: min(90vh);
display: grid;
grid-template-columns: 250px auto;
`;
const QuestionsContainer = styled.div`
background:#242424;
`;
const SideBar = styled.div`
background:#212121;
border-right: 2px solid #00ff5d;
`;
const HeaderRow = styled.div`
display: grid;
grid-template-columns: 1fr min-content;
padding: 24px 20px;
background: #242424;
height: 33px;
position: sticky;
top: 72px;
`;
const GreenButton = styled.button`
display: block;
width: 13%;
padding: 14px;
margin:20px;
border-radius: 3px;
background: #0af05e;
border: 0px;
`;
const NavUl=styled.ul`
position: sticky;
top: 82px;
`;
const NavLink=styled.li`
    padding: 11px 15px;
    color: #0af05e;
    margin: 10px;
    border-bottom: 1px solid #454545;
`;

const QuestionTitle = styled.input`
    display:block;
    width:96%;
    background-color:#242424;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 10px;
    margin :20px;
    box-sizing: border-box;
    color:#fff;
`;
const QuestionBodyTextarea = styled.textarea`
    display:block;
    width:96%;
    background-color:#242424;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 10px;
    margin: 20px;
    box-sizing: border-box;
    min-height: 200px;
    color:#fff;
    font-family:inherit;
`;
const PreviewArea = styled.div`
padding: 10px 20px;
background-color: #444;
border-radius: 5px;
color: #fff;
width: 93%;
`;
const QuestionBox = styled.div`
display:flex;
flex-direction: column;
background: #211f1f;
align-items: center;
padding: 20px 17px;
`;
function AskQuestion() {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    function sendQuestion(){
        axios.post('http://localhost:3030/questions',{
            title:questionTitle,
            content:questionBody,
        }, {withCredentials:true})
        .then(response=>console.log(response));
    }
    return (
        <div>
            <GlobalStyle />
            <HeroContainer>
                <SideBar>
                    <NavUl>
                        <NavLink><a>Home</a></NavLink>
                        <NavLink><a>Your Questions</a></NavLink>
                        <NavLink><a>Questions You Answered</a></NavLink>
                    </NavUl>
                </SideBar>
                <QuestionsContainer>
                    <HeaderRow>
                    <Heading>Ask a public Question</Heading>
                    </HeaderRow>
                    <QuestionBox>
                    <QuestionTitle type="text" placeholder="Title of your Question" 
                    value={questionTitle} 
                    onChange={ev=>setQuestionTitle(ev.target.value)}/> 
                    <QuestionBodyTextarea placeholder="More info about your Questions." value={questionBody}  
                    onChange={ev=>setQuestionBody(ev.target.value)}>{questionBody}</QuestionBodyTextarea> 
                    <PreviewArea>
                        <ReactMarkdown plugins={[gfm]} children={questionBody} />
                    </PreviewArea> 
                    </QuestionBox>
                    <GreenButton onClick={()=>sendQuestion()}>Post Question</GreenButton>
                </QuestionsContainer>
            </HeroContainer>

        </div>
    )
}
export default AskQuestion;
import styled from "styled-components";
import MainHeader from "./MainHeader";
import Heading from "./Heading";
import QuestionRow from "./QuestionRow";
import { createGlobalStyle } from "styled-components";
const GlobalStyle=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
body{
    font-family: 'Roboto', sans-serif;
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
width: 100px;
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
`;
function AskQuestion() {
    return (
        <div>
            <GlobalStyle />
            <MainHeader />
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
                    <QuestionTitle type="text" placeholder="Title of your Question"/> 
                    <QuestionBodyTextarea placeholder="More info about your Questions."/>     
                    <GreenButton>Post Your Answer</GreenButton>
                </QuestionsContainer>
            </HeroContainer>

        </div>
    )
}
export default AskQuestion;
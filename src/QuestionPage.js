import {useEffect, useState} from 'react';
import heading from './Heading';
import axios from "axios";
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
const Container = styled.div`
padding: 30px 20px;
`;
function QuestionPage({match}){
    const [question,setQuestion]=useState(false);
    function fetchQuestion(){
        axios.get('http://localhost:3030/questionpage/'+match.params.id)
        .then(response=>{
             setQuestion(response.data);
        })
    }
    useEffect(()=>fetchQuestion(),[]);
    return(
        <>
        <Container>
            {question && (
                <heading>{question.title}</heading>
                )}
            {question && (
                <ReactMarkdown plugins={[gfm]} children={question.content} />
            )}  
        </Container>
        </>
    )
}
export default QuestionPage;
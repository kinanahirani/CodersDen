import styled from "styled-components";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Tag from "./Tag";
const QuestionStat = styled.div`
  text-align: center;
  display: inline-block;
  font-size: 1.2rem;
  color:#aaa;
  margin-top:7px;
  span{
    font-size:.7rem;
    display: block;
    font-weight: 300;
    margin-top: 4px;
  }
`;
const QuestionTitleArea = styled.div`
  padding: 0 30px;
`;
const QuestionLink = styled(Link)`
text-decoration: none;
  color:#3ca4ff;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;
`;
const StyledQuestionRow = styled.div`
  background-color: rgba(255,255,255,.05);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: repeat(3, 50px) 1fr;
  border-top: 1px solid #555;
`;
const WhoAndWhen = styled.div`
  display: inline-block;
  color:#aaa;
  font-size: .8rem;
  float:right;
  padding: 10px 0;
`;
function QuestionRow({title,id,tags}){
    return(
        <StyledQuestionRow>
      <QuestionStat>0<span>votes</span></QuestionStat>
      <QuestionStat>1<span>answers</span></QuestionStat>
      <QuestionStat>6<span>views</span></QuestionStat>
      <QuestionTitleArea>
      <QuestionLink to={'/questionpage/'+id}>{title}</QuestionLink>
      </QuestionTitleArea>
      </StyledQuestionRow>
    )
}
QuestionRow.propTypes={
  title:PropTypes.string.isRequired
};
export default QuestionRow;
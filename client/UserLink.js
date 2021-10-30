import styled from "styled-components";
import {Link} from 'react-router-dom';

const StyledUserLink = styled(Link)`
  color: #3ca4ff;
  text-decoration: none;
  &:hover{
    text-decoration: underline;
  }
`;

function UserLink(props) {
  return (<StyledUserLink {...props} />);
}

export default UserLink;
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const List = styled(Link)`
  display: block;
  padding: 2rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;

  :hover {
    background-color: ${(props) => props.theme.colors.cyan};
    color: ${(props) => props.theme.colors.white};
  }
`;

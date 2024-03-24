import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const Stage = styled(Link)`
  text-decoration: underline;

  :hover {
    font-weight: bold;
    color: ${(props) => props.theme.colors.primary};
  }
`;

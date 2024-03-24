import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0 0 3rem;
`;

export const Main = styled(Link)`
  align-self: flex-end;
  padding: 1rem;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.8rem;

  :hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.white};
  }
`;

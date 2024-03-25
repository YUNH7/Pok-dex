import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const Stages = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Stage = styled(Link)<{ emphasis?: string }>`
  text-decoration: underline;
  font-weight: ${(props) => props.emphasis && "bold"};
  color: ${(props) => props.emphasis && props.theme.colors.primary};

  :hover {
    font-weight: bold;
    color: ${(props) => props.theme.colors.primary};
  }
`;

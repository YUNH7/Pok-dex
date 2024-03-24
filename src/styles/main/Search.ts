import styled from "@emotion/styled";

export const Label = styled.label`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 5px solid ${(props) => props.theme.colors.yellow};
`;

export const Input = styled.input`
  width: 30%;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
`;

export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.yellow};
  font-weight: bold;
  font-size: 0.8rem;

  :hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

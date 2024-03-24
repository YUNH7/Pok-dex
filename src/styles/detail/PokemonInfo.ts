import styled from "@emotion/styled";

export const Image = styled.img`
  min-width: 10%;
  object-fit: contain;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const Spinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 1.5s linear infinite;
  border-radius: 50%;
  border: 6px solid ${(props) => props.theme.colors.yellow};
  border-top: 6px solid ${(props) => props.theme.colors.primary};
  width: 4rem;
  height: 4rem;
  margin: 15rem auto;
`;

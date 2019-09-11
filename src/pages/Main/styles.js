import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  padding: 10px;
  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    background-color: #ffffff;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
    border: ${(props) => (props.withError ? '2px solid #ff0000' : 0)};
  }
  button {
    height: 55px;
    margin-left: 10px;
    background-color: #63f5b0;
    color: #ffffff;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;
    width: 100px;
    &:hover {
      background-color: #52d89f;
      cursor: pointer;
    }
  }
`;

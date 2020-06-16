import styled from 'styled-components';

const Input = styled.input`
  max-width: 300px;
  margin: 20px 0;
  padding: 15px 30px;
  font-size: 18px;
  background-color: #fff;
  border: none;
  border-radius: 50px;

  ::placeholder {
    letter-spacing: 1px;
    color: gray;
  }
`;

export default Input;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const RegisterLink = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Loader = styled.div`
  width: 25px;
  height: 25px;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #383636; /* Black */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(state => state.user);

  const loginHandler = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  }

  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate('/');
  }, [user, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input type='text' placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={loginHandler} disabled={isFetching} >LOGIN</Button>
          {isFetching && <Loader />}
          {error != null && <Error>{error}</Error>}
          <Link to='/register'><RegisterLink >CREATE A NEW ACCOUNT</RegisterLink></Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
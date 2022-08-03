import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  display: block;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const LoginLink = styled.a`
  margin: auto 20px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(state => state.user);

  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate('/');
  }, [user, navigate]);

  const registerHandler = (e) => {
    e.preventDefault();
    register(dispatch, { username, email, password });
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input value={username} placeholder="username" type='text' onChange={e => setUsername(e.target.value)} />
          <Input value={email} placeholder="email" type='email' onChange={e => setEmail(e.target.value)} />
          <Input value={password} placeholder="password" type='password' onChange={e => setPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Bottom>
            <Button onClick={registerHandler} disabled={isFetching}>CREATE</Button>
            <Link to='/login'><LoginLink>Already have an account</LoginLink></Link>
          </Bottom>
          {isFetching && <Loader />}
          {error !== null && <Error>{error}</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
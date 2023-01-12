import React, { useState } from 'react'
import styled from "styled-components"
import { Link} from "react-router-dom"
import axios from 'axios'
import { mobile } from '../responsive'



const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.5)),url("https://i.im.ge/2022/08/09/FKJKEc.MOTORHEAD-heavy-metal-hard-rock-guitar-guitars-concert-concerts-u-2592x1728.jpg");
    background-size:cover;
    height: 100vh;
    width: 100%;
`

const Wrapper = styled.div`
    
    
    
    
    height: 70vh;
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`

const Header = styled.h1`
    
`

const Form = styled.form`
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin:20px;
`

const Input = styled.input`
    height:6vh;
    width:60%;
    padding:10px;
    margin-bottom: 10px;
    ${mobile({width:"100%"})}
`
const ButtonField = styled.div`
    display:flex;
    align-items: center;
    
`

const Button = styled.button`
    font-size:21px;
    ${mobile({margin:"10px"})}

`

const Register = styled.a`
    margin-left: 45px;
    font-size:15px;
    font-weight: bolder;
    text-decoration: underline;
`
const ErrorText = styled.div`
    color:red;
`


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    

    const loginHandler = async (e) => {
        e.preventDefault();
       try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {username,password},{ withCredentials: true })

        localStorage.setItem("user", res.data.username)
        window.location.href = "/";

     } catch(e) {
        setError("Invalid username or password")
        
       }
    
    }
        
    

  return (
    <Container>
        <Wrapper>
            <Header>LOGIN</Header>
            <Form>
                <Input placeholder='Username' required onChange={(e) => setUsername(e.target.value)}  />
                <Input placeholder='Password' type="password" required onChange={(e) => setPassword(e.target.value)} />
                <ButtonField>
                <Button onClick={loginHandler} >LOGIN</Button>
                <Link to="/register"> <Register>REGISTER</Register> </Link>
                </ButtonField>

                 
            </Form>
              <ErrorText> {error} </ErrorText>
        </Wrapper>
    </Container>
  )
}

export default Login

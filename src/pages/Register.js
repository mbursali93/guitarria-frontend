import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.5)),url("https://i.im.ge/2022/08/09/FKJZIT.BUCKETHEAD-guitar-guitarist-heavy-metal-progressive-funk-avant-garden-instrumental-experimental-bluegrass-1900x1450.jpg") center;
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

const Login = styled.a`
    margin-left: 45px;
    font-size:15px;
    font-weight: bolder;
    text-decoration: underline;
`

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:9000/api/auth/register", { username,email,password }, {withCredentials:true})
            navigate("/login")
        } catch(e) {
            
            setError(e.message)
        }
    }
    
    
  return (
    <Container>
        <Wrapper>
            <Header>REGISTER</Header>
            <Form>
                <Input placeholder='Username' required onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder='Email' type="email" required onChange={(e) => setEmail(e.target.value)}/>
                <Input placeholder='Password' type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <ButtonField>
                <Button onClick={handleRegister} >REGISTER</Button>
                <Link to="/login"> <Login>LOGIN</Login> </Link>
                </ButtonField>

                {error}
                 
            </Form>
            
        </Wrapper>
    </Container>
  )
}



export default Register
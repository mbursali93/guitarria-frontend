import React from 'react'
import styled from "styled-components"

const Container = styled.div`
    background-color: gray;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 31px;
`
const Left = styled.div`

`
const Logo = styled.div`
    font-family: 'Mouse Memoirs';
    letter-spacing: 5px;
    color:black;
    font-weight: bolder;
    font-size: 30px;
    padding: 13px;
`

const Right = styled.div`
    font-size: 20px;
    font-weight: bolder;
    padding-right:15px;
`


const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>Guitarria</Logo>
        </Left>
        <Right>
            Github: mbursali93
        </Right>
    </Container>
  )
}

export default Footer

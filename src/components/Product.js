import React, {useContext} from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"
import { GlobalState } from '../api/GlobalState'



const Container = styled.div`
    border: 2px solid black;
    border-radius: 11px;
    height: 580px;
    width: 344px;   
    margin-top: 20px;
    transition: 0.4s;
    &:hover{
        box-shadow: 5px 5px 10px, -5px 5px 10px;
    }
    
`


const Image = styled.img`
    padding:7px;
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: top;
    
`
const Info = styled.div`
    background-color: lightgray;
    margin:6px;
    padding-left: 4px;
    height: 156px;
`
const Title = styled.h4`
    font-size: 22px;
    
`
const Desc = styled.p`

`
const Price = styled.div`
    font-size:34px;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    height: 36px;
    margin-top:9px;
    
    
    
`



const Button = styled.button`
    background-color: #cc4029;
    border-radius: 4px;
    width: 120px;
    height: 35px;
    font-size: 21px;
    font-weight: bold;
    color:black ;
    cursor: pointer;
    transition: 0.4s;

    &:hover{
        color:white;
    }
`




const Product = ({item}) => {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    const product = item;
    const itemColor = "-"
    const quantity = 1;
    const cartItem = {product, itemColor, quantity}
    

    const addToCart = (item) => {
      if(item.product.color.length > 0){
        alert("This item has more than one color options. Please choose a color! ")

      } else if(item.product.inStock === 0) {
        alert("This item is not in stock for now.")

      }
        else {
            addCart(item)
        }      

    }
    

  return (
    <Container>
        <Image src={item.img} />
        <Info>
            <Title> {item.title}</Title>
            <Desc> {item.desc} </Desc>
            <Price> ${item.price} </Price>
        </Info>
        <Buttons>
            <Link to={`/products/${item._id}`}  > <Button>View</Button> </Link>
            <Button  onClick={()=> addToCart(cartItem)}  >Add Cart</Button>
        </Buttons>
    </Container>
  )
}

export default Product

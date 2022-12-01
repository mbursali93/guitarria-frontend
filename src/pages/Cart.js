import React, {useState, useEffect, useContext} from 'react'
import { GlobalState } from '../api/GlobalState'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PayButton from '../components/PayButton'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import { mobile } from '../responsive'


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;

    ${mobile({flexDirection:"column"})}

`

const Left = styled.div`
    background-color: aliceblue;
    height: 100%;
    width: 65vw;
    text-align: center;
    ${mobile({width:"90vw"})}

`

const Right = styled.div`
    background-color: lightgray;
    padding: 30px;
    font-size: 34px;
    border: 2px solid gray;
    flex-direction:column;

    min-width: 25vw;
    height: 200px;
    border: 1px solid gray;
    position:sticky;
    top: 0px;
    ${mobile({width:"100%", marginTop:"10px"})}
`


const Product = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:8px;
`

const Image = styled.img`
    height:20vh;
    width: 10vw;
`
const Hr = styled.hr`

`



const Title = styled.h3`

    ${mobile({fontSize:"15px"})}

`

const Price = styled.h4`
    font-size: 27px;

    ${mobile({fontSize:"18px"})}

`

const Quantity = styled.div`
    display:flex;
    align-items: center;
    font-size: 22px;
`

const PaymentContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width:100%;
    height: 100%;
`

const Payment = styled.h4`
    text-align: center;
    padding-bottom:9px;
`

const Desc = styled.h5`
    text-align: center;
    padding-bottom:9px;


`
const TitleContainer = styled.div`

`
const Color = styled.h5`
    
`

const MessageField = styled.div`
    text-align: center;
    margin-top:40px;
`





const Cart = () => {
   
   const state = useContext(GlobalState)
   const [cart, setCart] = state.userAPI.cart
   const [token] = state.token
   const [total, setTotal] = useState(0)

   

   const increaseQuantity = async (product) => {
    cart.filter(item => {
        if(item.product._id === product.product._id && item.itemColor === product.itemColor ){
            item.quantity += 1
        }
    })

    setCart([...cart])
    await axios.patch("http://localhost:9000/api/users/cart", {cart}, {headers: {Authorization:token}})
    
   }

   const decreaseQuantity = async (product) => {
    cart.filter(item => {
        if(item.product._id === product.product._id && item.itemColor === product.itemColor ){
            item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
        }
    })

    setCart([...cart])
    await axios.patch("http://localhost:9000/api/users/cart", {cart}, {headers: {Authorization:token}})
    
   }

   const removeProduct = async (product) => {
    const itemIndex = cart.findIndex(item => item.product._id === product.product._id && item.itemColor === product.itemColor)
    cart.splice(itemIndex,1)

    setCart([...cart])
    await axios.patch("http://localhost:9000/api/users/cart", {cart}, {headers: {Authorization:token}})
    
   }


   useEffect(() =>{
    const getTotal = () =>{
        const total = cart.reduce((prev, item) => {
            return prev + (item.product.price * item.quantity)
        },0)

        setTotal(total)
    }

    getTotal()

},[cart])


  return (
    <div>
    <Header/>
    <Container>
        <Left>
            {cart.map((item) =>(
                <div>
                    <Product key={item.product._id}>
                <Image src={item.product.img} />
                
                    <TitleContainer>
                        <Title>{item.product.title}</Title>
                        <Color>{item.itemColor}</Color>
                    </TitleContainer>
                    <Quantity> <RemoveIcon style={{cursor:"pointer"}} onClick={()=> decreaseQuantity(item)} /> {item.quantity} <AddIcon style={{cursor:"pointer"}} onClick={()=> increaseQuantity(item)} /> </Quantity>
                
                <Price> ${item.product.price * item.quantity} </Price>
                <DeleteIcon style={{cursor:"pointer"}} onClick={()=> removeProduct(item) } />
                
                
            </Product>
                <Hr/>
                </div>
            ))}
        </Left>
        <Right>
            {total > 0 ? <PaymentContainer>
                <Payment>Payment</Payment>
                <Desc> Total = ${total} </Desc>
                <PayButton /> 
            </PaymentContainer> : <MessageField>Your cart is empty </MessageField> }
        </Right>
    </Container>
    <Footer/>

    </div>
  )
}

export default Cart

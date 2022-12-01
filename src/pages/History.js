import React, {useContext} from 'react'
import styled from "styled-components"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { GlobalState } from '../api/GlobalState'


const Container = styled.div`

`
const Histories = styled.div`
  background-color: gray;
  padding: 20px;
  margin: 10px;
  border: 1px black solid;
 
`

const Id = styled.div`
  font-size: 25px;
`


const Details = styled.li`

`
const Info = styled.div`
  font-size: 16px;
`

const Products = styled.ul`

`


const InfoTotal = styled.h4`

`



const History = () => {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history

  

  return (
    <div>
      <Header/>
      <Container>
        {history.map(orders=>(
          <Histories>
            <Id> Order_Id: {orders._id}</Id>
            <Info> Name: {orders.address.name} </Info>
            <Info> Email: {orders.address.email} </Info>
            <Products> Products: {orders.products.map(item=> (
              <Details> Title: {item.product.title}, Color: {item.itemColor}, Quantity: {item.quantity}x Price: ${item.quantity * item.product.price} </Details>
            ))} </Products>
            <InfoTotal> TOTAL: ${orders.total}  </InfoTotal>
              <Info>
                Address: {orders.address.address.line1}, 
                  {orders.address.address.line2}, 
                  {orders.address.address.city}

                  </Info>
                  <Info> Date: {orders.createdAt.split("T", 1)}. </Info>
                  <Info> Status: {orders.status}   </Info>
            </Histories>
        ))}
      </Container>
      <Footer/>
    </div>
  )
}

export default History

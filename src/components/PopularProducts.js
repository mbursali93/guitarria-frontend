import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import Product from './Product'
import axios from "axios";

const Container = styled.div`
    margin-top: 15px;
    padding: 20px;
    height:100%;
    
    
    
    

`
const HeaderDiv = styled.div`
    display: flex;
    align-items: center;
`
const Header = styled.h1`
    flex:1;
    margin-left:5px;
`

const Hr = styled.hr`
background-color: black;
  color:black;
  width: 80vw;
  height: 3px;
  margin: 0 auto;
  flex:3.5;

  `

  const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
  `

  const ProductLink = styled.div`
    font-size: 22px;
    text-align: center;
    margin-top:15px;
  `


const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/?sort=popular&limit=4`)
        setProducts(res.data.products);
                
      } catch(e) {


      }
    }
    getProducts();
  },[])



  return (
    <Container>
        <HeaderDiv>
            <Header>Popular Products  </Header>
            <Hr/>
        </HeaderDiv>
        <ProductContainer>
            {products.map((item) => (
                <Product item ={item} key= {item._id} />
            ))}
        </ProductContainer>
        <ProductLink> <Link to = "/products"> See All Products</Link> </ProductLink>
       
    </Container>
  )
}

export default PopularProducts

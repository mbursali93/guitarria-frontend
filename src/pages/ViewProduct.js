import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled from "styled-components"
import Footer from '../components/Footer'
import Header from "../components/Header"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GlobalState } from '../api/GlobalState'
import { mobile } from '../responsive'
import axios from 'axios'

const Container = styled.div`
    padding: 30px;
    height: 120vh;
    display: flex;
    justify-content: space-between;
    background-color: gainsboro;
    ${mobile({flexDirection:"column"})}
    height: 140vh;
    display: flex;
    justify-content: space-between;
    background-color: gainsboro;
    ${mobile({flexDirection:"column", weight:"222px"})}

`

const Left = styled.div`
    flex:1;

    border: 1px solid black;
    ${mobile({maxWeight:"400px", maxHeight: "400px",marginTop:"31px"})}

`
const Image = styled.img`
    object-fit: cover;
    object-position: top;
    padding:10px;
    height: 100%;
    width: 100%;
    ${mobile({maxWeight:"400px", maxHeight: "400px"})}
    

`


const Right = styled.div`
    flex:1;
    
`

const Info = styled.div`

    
    padding:25px;

    padding:0.5em;

    margin-top:40px;
`

const Title = styled.h1`

    font-size:55px;

    font-size:3rem;

    ${mobile({textAlign:"center", fontSize:"30px"})}
`

const Desc = styled.p`
    font-size:31px;
    margin-top:10px;
    ${mobile({textAlign:"center", fontSize: "20px", padding:"10px"})}

`

const Price = styled.h3`
    font-size: 55px;
    margin-top:31px;
    ${mobile({textAlign:"center"})}
`

const Options = styled.div`
    height: 55px;
    
    font-size: 21px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    ${mobile({textAlign:"center"})}

`

const Option = styled.option`
    
`
const OptionField = styled.div`
    
`

const Select = styled.select`
    width: 5vw;
    height: 5vh;
    ${mobile({width:"80px", height:"5.5vh"})}
`

const QuantityAndButton = styled.div`
    display:flex;
    ${mobile({textAlign:"center"})}
    align-items: center;
    margin-top:11px;
`

const QuantityField = styled.div`
    display: flex;
    align-items: center;
    font-size: 50px;
    padding:18px;
    
`

const Quantity = styled.div`

`

const Button = styled.button`
    font-size: 17px;
    font-weight:bold;
    width: 110px;
    height: 42px;
    background-color:#cc4029;
    border: 1px solid gray;
    border-radius:6px;
    cursor:pointer;
    transition: 0.4s;

    
    &:hover {
        color:white;
    }
`

const NotAvailable = styled.div`
    font-size: 40px;
    padding:10px;

    font-size: 2rem;
    text-align: center;
    padding:10px;


`




const ViewProduct = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [itemColor, setItemColor] = useState("-");
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState({})

    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart
    


    useEffect(()=> {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/api/products/${id}`)
                setProduct(res.data)

            }catch{


            }

        }
        getProduct();
    },[id])

    useEffect(()=> {
        setItem({product,itemColor,quantity})
        
        
    },[itemColor,quantity,product])

    

    
    const handleQuantity = (e) => {
        if(e ==="inc") {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity > 1 ? quantity  - 1 : quantity )
        }

    }

    const handleColor = (e) => {
        setItemColor(e.target.value)
    }
    

    
  return (
    <div>
        <Header/>
        <Container>
            <Left>
                <Image src={product.img} />    
            </Left>
            <Right>
                <Info>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>${product.price}</Price>
                </Info>
                 
                <Options key={product._id} >
                {product.color?.length > 0 &&
                    <OptionField>
                        Color:
                        <Select onChange={handleColor} >
                            <Option defaultValue={"-"}>-</Option>
                            {product.color.map((color) => (
                               <Option value={color}>{color}</Option> 
                            ))}

                        </Select>
                                      
                        </OptionField>}
                </Options>   
                {product.inStock > 0 ? <QuantityAndButton>
                    <QuantityField> 
                        <RemoveIcon style={{fontSize:30, cursor:"pointer"}} onClick={() => handleQuantity("dec")} />
                     <Quantity>{quantity}</Quantity> 
                     <AddIcon style={{fontSize:30, cursor:"pointer"}} onClick={() => handleQuantity("inc")} /> 
                     </QuantityField>
                     <Button onClick={() => addCart(item)} >Add Cart </Button> 
                     
                </QuantityAndButton> : <NotAvailable>This item is not in our stock for now</NotAvailable>}
            </Right>
        </Container>
        <Footer/>
    </div>
  )
}

export default ViewProduct

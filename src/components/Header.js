import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link} from "react-router-dom";
import { GlobalState } from "../api/GlobalState";
import debounce from "lodash.debounce";
import { mobile } from "../responsive.js"
import axios from "axios";
import Menu from "./Menu"
import ResponsiveMenu from "./ResponsiveMenu";



const Container = styled.div `
    
    background-color: #cc4029;
    height: 60px;
    display: flex;

`

const Left = styled.div`
    flex:1;
    display: flex;

`
const Logo = styled.div`
    font-family: 'Mouse Memoirs';
    letter-spacing: 5px;
    color:whitesmoke;
    font-weight: bolder;
    font-size: 30px;
    cursor: pointer;
    padding: 13px;
`


const Middle = styled.div`
    flex:1;
    
    
`

const Seach = styled.div`
    display: flex;
    align-items: center;
    margin-top:11px;
    border:6px white solid;
    border-radius: 31px;

    background-color: white;

     
`
const Input = styled.input`
    height: 27px;
    width:31vw;
    border:none;
    ${mobile({ width: "19vw" })}
`

const SearchField = styled.div`
    background-color: gray;
    display: flex;
    flex-direction: column;
    
`

const SearchItem = styled.li`
    z-index: 2;
    background-color: gray;
`

const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-left: 55px;
    padding-left: 4vw;
    margin-right:31px;
    z-index: 2;

`



const Login = styled.a`
    margin-left:25px;
    cursor:pointer;
    text-decoration:none;
    color:white;
    ${mobile({ display: "none" })}
`

const Register = styled.a`

    cursor:pointer;
    text-decoration:none;

    text-decoration: none;

    color:white;
    ${mobile({ display: "none" })}
`



const MenuContainer = styled.div`
    ${mobile({display:"none"})}

 
`






const Item = styled.div`

    ${mobile({ display: "none" })}
`
const Responsive = styled.div`
    display: none;

    ${mobile({ display: "block" })}
`

export default function Header() {


    const state = useContext(GlobalState);
    
    const [cart] = state.userAPI.cart
   

   const [search,setSearch] = useState("")
   const [products, setProducts] = useState([])

   const user = localStorage.getItem("user")
    
   

    
    useEffect(()=> {
        const searchProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/?search=${search}&limit=5`)
                setProducts([...res.data.products])
                
                
            } catch(e) {
                

            }
        }
        searchProducts()
    }, [search])


   
    
    
    
  
    return(
        <Container>
            <Left>
                <Link to="/" style={{textDecoration:"none"}} > <Logo>GUITARRIA</Logo> </Link>
            </Left>
            <Middle>
                <Seach>
                    
                    <SearchIcon style={{backgroundColor:"white", fontSize: 27}}  />
                    <Input type="search" onChange={debounce((e) => setSearch(e.target.value), 800)} />  
                    
                </Seach>
                    {search.length > 0 && <SearchField>
                        {products.map(item=> (
                            <SearchItem> <Link to={`/products/${item._id}`} > {item.title} </Link> </SearchItem>
                            
                        ))}
                    </SearchField>}
            </Middle>
            <Right>
            
            {user ? <MenuContainer> <Menu/> </MenuContainer> :   <Link to="/register"> <Register >Register</Register> </Link>  }
            {user ? <Link to ="/cart"><Item> <Badge badgeContent={cart.length} color="primary" >
  <ShoppingCartOutlinedIcon color="action" style={{color:"white", marginLeft:"15px"}} />
</Badge></Item> </Link> : <Link to="/login"> <Login>Login</Login>  </Link>  }

                <Responsive>
                <ResponsiveMenu/>      
                </Responsive>    
            </Right>
        </Container>
    )
}



import React, {useContext} from "react"
import styled from "styled-components"
import axios from "axios"
import { GlobalState } from "../api/GlobalState"

const Button = styled.button`
    font-size: 24px;
    border:none;
    color:white;
    background-color: black;
    min-width: 100%;
    text-align: center;
    transition: 0.5s;
    

    &:hover {
        background-color:darkgreen;
        
    }
`

export default function PayButton() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [user] = state.userAPI.user
    const [cart, setCart] = state.userAPI.cart
   
    const handleClick = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/stripe/checkout`, {
                user_id: user._id,
                cart,

            },{headers: {Authorization:token}}, {withCredentials:true})

            if(res.data.url) {
                setCart([])
                await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/cart`, {cart} , {headers: {Authorization:token}})
                window.location.href = res.data.url
                
            }

        } catch(e) {
            
        }
    }


    return(
        <div>
            <Button onClick={handleClick}  > CHECKOUT </Button>
        </div>
    )
}
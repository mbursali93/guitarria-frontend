import { useState, useEffect } from "react"
import axios from "axios"



export default function UserAPI (token) {
    const [isLogged, setIsLogged] = useState(false)
    const [user,setUser] = useState({})
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])



    
    

    useEffect(()=> {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get("http://localhost:9000/api/users", {headers: {Authorization: token}}, { withCredentials: true })
                    setIsLogged(true);
                    setUser(res.data)
                  setCart(res.data.cart)
                } catch(e) {
                    console.log(e.message)
                }
            }
            getUser();
        }
    },[token])

    useEffect(()=> {
        if(token) {
            const getHistory = async () => {
                try {
                    const res = await axios.get("http://localhost:9000/api/orders/", {headers: {Authorization: token}}, { withCredentials: true })
                    
                    setHistory(res.data)
                  
                } catch(e) {
                    console.log(e.message)
                }
            }
            getHistory();
        }
    },[token])

    const addCart = async (item) => {

        let helperCart = cart
        
       if(token) {
        try {
            if(item.product.color.length > 0 && item.itemColor === "-") {
                return alert("This item has more than one color options. Please choose a color!")
             }
            let check = helperCart.filter(e=> e.product._id === item.product._id &&  e.itemColor === item.itemColor)

            if(check.length > 0) {
                const indexItem = helperCart.findIndex(e=> e.product._id === item.product._id && e.itemColor === item.itemColor)
                helperCart[indexItem].quantity += item.quantity
                setCart([...helperCart])
                await axios.patch("http://localhost:9000/api/users/cart", {cart}, {headers: {Authorization:token}})
                
            } else {
                helperCart.push(item)
                setCart([...helperCart])
                await axios.patch("http://localhost:9000/api/users/cart", {cart}, {headers: {Authorization:token}})
            }
          
           
        } catch(e){
            
        }
       } else {
        window.location.href="/login"

       }
        
    }
    
    return {
        isLogged: [isLogged, setIsLogged],
        cart: [cart, setCart],
        user: [user,setUser],
        history: [history, setHistory],
        addCart:addCart,
    }
}
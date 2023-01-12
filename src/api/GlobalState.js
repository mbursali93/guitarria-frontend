import React, { useState, useEffect, createContext} from "react"
import userAPI from "./UserAPI"
import axios from "axios"


export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken ] = useState("");


    useEffect(()=> {
        const user = localStorage.getItem("user")
    if(user) {
        const refreshToken = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/refresh_token`, {withCredentials:true})
                setToken(res.data);

                setTimeout(()=> {refreshToken()}, 1000*60*10)
            } catch {

            }
        }
        refreshToken()
    } 
    },[])


    const state = {
        token: [token, setToken],
        userAPI: userAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )



}


import { useState,useEffect,createContext } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [createUser,setCreateUser]=useState(JSON.parse(localStorage.getItem('user')))
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(createUser))

    },[createUser])
    return <userContext.Provider value={{createUser,setCreateUser}}>{children}</userContext.Provider>
}
export default UserProvider;
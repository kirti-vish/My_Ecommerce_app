import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const [ok, setOk]= useState(false)
    const [auth, setAuth]= useAuth()

    useEffect(()=>{
        const authCheck = async ()=>{
            const res= axios.get('/api/v1/auth/user-auth')
            if((await res).data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token])

    return ok ? <Outlet/> :<Spinner/>
}
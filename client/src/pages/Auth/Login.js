import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/AuthStyles.css";

import { useNavigate , useLocation} from "react-router-dom";

import toast from "react-hot-toast";
import instance from "../../imp.js";
import { useAuth } from "../../context/auth.js";

const Login = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()
  
  const navigate= useNavigate()
  const location= useLocation()

  //form function
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res= await instance.post('/api/v1/auth/login', { email, password})
      //console.log(res.data)
       toast.success(res.data.message)
       //alert('User Registered Successfully')
       setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token
       })
       localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || "/")
       // console.log("error")
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout title={"Register- Ecommerce app"}>
      <div className="form-container">
        
        <form onSubmit={handleSubmit} >
        <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          
    <div className="mb-3">
    <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button>
    </div>
          
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
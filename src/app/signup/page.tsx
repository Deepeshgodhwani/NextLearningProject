'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast/headless";


export default function Signup() {
  const router=useRouter()
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })

    const onSignUp =async ()=>{
      try {
        if(!user.email || !user.password || !user.username) return;

        const response =await axios.post(`/api/users/signup`,user)
        console.log(response.data);
        toast.success("User created successfully")        
        router.push('/login')
      } catch (error) {
        toast.error("error in creating user")
      }
    }
    
    return <div className="flex flex-col gap-2 items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl text-gray-300">Signup</h1>
        <hr/>
        <label htmlFor="username">username</label>
        <input
        className="p-4 border-gray-300 border bg-transparent text-white rounded-lg outline-none"
          id="username"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e)=>setUser({...user,username:e.target.value})}
         />
          <label htmlFor="username">email</label>
        <input
        className="p-4 border-gray-300 border bg-transparent text-white rounded-lg outline-none"
          id="email"
          type="text"
          placeholder="email"
          value={user.email}
          onChange={(e)=>setUser({...user,email:e.target.value})}
         />
        <label htmlFor="username">password</label>
        <input
        className="p-4 border-gray-300 border bg-transparent text-white rounded-lg outline-none"
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
         />

         <button onClick={onSignUp} className="p-2 mt-4 bg-blue-900 rounded-lg outline-none border border-gray-300">Signup here</button>
        <Link href={"/login"}>Visit login page</Link>
    </div>;
  }
  
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router=useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
  
      try {
        if(!user.email || !user.password ) return;
        const response =await axios.post(`/api/users/login`,user)
        console.log(response.data);
        toast.success("Logged in successfully")        
        router.push('/profile')
    }catch(error){

    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl text-gray-300">Login</h1>
      <hr />
      <label htmlFor="username">email</label>
      <input
        className="p-4 border-gray-300 border bg-transparent text-white rounded-lg outline-none"
        id="email"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="username">password</label>
      <input
        className="p-4 border-gray-300 border bg-transparent text-white rounded-lg outline-none"
        id="password"
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onLogin}
        className="p-2 mt-4 bg-blue-900 rounded-lg outline-none border border-gray-300"
      >
        Login here
      </button>
      <Link href={"/signup"}>Visit signup page</Link>
    </div>
  );
}

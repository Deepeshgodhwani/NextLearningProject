'use client'

import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";


export default function ProfilePage (){
    const [userId, setUserId] = useState("")
    const router=useRouter()
    const handleLogout= async ()=>{
        try {
            const response = await  axios.get(`/api/users/logout`) 
            if(response.data.success){
                router.push('/login')
            }   
          } catch (error) {
            toast.error("error in creating user")
          }
        
    }
    

    useEffect(() => {
        const getLoggedInUserData = async ()=>{
            try {
                const response =await axios.get(`/api/users/me`)
                if(response.data.data){
                    setUserId(response.data.data._id)
                }
            }catch(error){
            
            }
        }
        getLoggedInUserData()
    }, [])
    

    

    return <div className="flex flex-col gap-2  items-center min-h-screen py-2 justify-center">
        <h1 className="text-xl">Profile</h1>
        <hr/>
        <p className="text-lg">
            Profile page
        </p>
       
        <h1 className="text-xl">
        <Link href={`/profile/${userId}`}>
            User Id : {userId?userId : "User not found"}
        </Link>
        
        </h1>
        <button
        onClick={handleLogout}
        className="p-2 px-4 mt-4 bg-green-700 rounded-lg outline-none border border-gray-300"
      >
        Logout
      </button>
       
    </div>
}
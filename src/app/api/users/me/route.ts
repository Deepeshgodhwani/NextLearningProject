import { connectDb } from "@/dbConfig/dbConfig";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


connectDb();

export async function GET(req:NextRequest) {
    try {
        const userId=await getDataFromToken(req);
        const userData=await User.findById(userId).select("-password");
        return NextResponse.json({ message: "user found",data:userData, success: true }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
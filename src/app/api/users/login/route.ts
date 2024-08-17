import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDb();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        //check is userExists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User doesn't exists" }, { status: 400 });
        }

        const isUserVerified = bycryptjs.compare(password, user.password)

        if (!isUserVerified)
            return NextResponse.json({ error: "Incorrect passowrd" }, { status: 400 });

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        const response =NextResponse.json({ message: "Login successfully", success: true }, { status: 200 });
        response.cookies.set("token",token,{httpOnly:true});
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
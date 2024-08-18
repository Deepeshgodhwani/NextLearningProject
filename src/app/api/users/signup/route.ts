import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connectDb();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        //check is userExists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }


        //hash
        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        //send verification email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: "User created successfully", success: true, user: savedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from 'bcryptjs';

connectDb();
export async function GET(req: NextRequest) {
    try {
        const response= NextResponse.json({ message: "User logged out succefully", success: true }, { status: 200 });
        response.cookies.delete("token");
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
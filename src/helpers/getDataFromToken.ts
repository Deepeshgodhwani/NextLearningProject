import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


export default async function getDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken: any = await jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
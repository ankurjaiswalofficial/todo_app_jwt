import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword } from "@/validation/auth-validations";

export async function POST(req: NextRequest) {
    const SYSTEM_AUTH_SECRET = process.env.SYSTEM_AUTH_SECRET;
    if (!SYSTEM_AUTH_SECRET) throw new Error("SYSTEM_AUTH_SECRET not found in environment");

    const body = await req.json();
    console.log(body);
    const { email, password, timeline } = body;
    const passEmail = validateEmail(email);
    const passPassword = validatePassword(password);
    if (passEmail !== true || passPassword !== true) {
        return NextResponse.json({ status: "failed", error: `Validation Failed: \nEmail: ${passEmail} \nPassword: ${passPassword}` });
    }
    const jwtToken = jwt.sign({ email, password, timeline }, SYSTEM_AUTH_SECRET);
    return NextResponse.json({ status: "success", data: { jwt: jwtToken } });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    return NextResponse.error();
}

import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/validation/auth-validations";
import { Get_Auth_Secret } from "@/handler/env-handler";
import { CreateToken } from "@/service/token-service";

export async function POST(req: NextRequest) {
    const SYSTEM_AUTH_SECRET = Get_Auth_Secret();
    const body = await req.json();
    console.log(body);
    const { email, password, timeline } = body;
    const passEmail = validateEmail(email);
    const passPassword = validatePassword(password);
    if (passEmail !== true || passPassword !== true) {
        return NextResponse.json({ status: "failed", error: `Validation Failed: \nEmail: ${passEmail} \nPassword: ${passPassword}` });
    }
    const payload = { email, password, timeline };
    const jwtToken = CreateToken(payload, SYSTEM_AUTH_SECRET);
    return NextResponse.json({ status: "success", data: { token: jwtToken } });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    return NextResponse.error();
}

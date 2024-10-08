import { NextRequest, NextResponse } from "next/server";
import { Get_Auth_Secret } from "@/handler/env-handler";
import { CreateToken, VerifyToken } from "@/service/token-service";

export async function POST(req: NextRequest) {
    const SYSTEM_AUTH_SECRET = Get_Auth_Secret();
    const body = await req.json();
    const { token, timeline } = body;
    const valid = VerifyToken(token, SYSTEM_AUTH_SECRET);
    if (valid) {
        const { email, password } = valid;
        const newToken = CreateToken({ email, password, timeline }, SYSTEM_AUTH_SECRET)
        return NextResponse.json({ status: "success", data: { token: newToken } });
    }
    else {
        return NextResponse.error();
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    return NextResponse.error();
}

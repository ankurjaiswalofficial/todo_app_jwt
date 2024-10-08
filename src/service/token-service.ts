"use server";

import jwt from "jsonwebtoken";

function CreateToken(payload: object, secret: string) {
    const token = jwt.sign(payload, secret);
    return token;
}

function VerifyToken(token: string, secret: string) {
    try {
        const payload = jwt.verify(token, secret) as unknown as jwt.JwtPayload;
        return {email: payload.email, password: payload.password};
    } catch {
        return false;
    }
}

export { CreateToken, VerifyToken };

function Get_Auth_Secret() {
    const SYSTEM_AUTH_SECRET = process.env.SYSTEM_AUTH_SECRET;
    if (!SYSTEM_AUTH_SECRET) {
        throw new Error("SYSTEM_AUTH_SECRET Dosen't exists");
    }

    else {
        return SYSTEM_AUTH_SECRET;
    }
}

export { Get_Auth_Secret };

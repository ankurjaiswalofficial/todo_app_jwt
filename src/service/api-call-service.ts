async function SignUpService(payload: object) {
    const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(payload)
    })
        .then(async (value) => {
            if (value.status === 200) {
                const resp = await value.json();
                if (resp.status === "success") {
                    return { status: "success", data: resp.data.token }
                }
                else {
                    return { status: "failed", data: resp.error }
                }
            }
        })
        .catch((reason) => {
            return { status: "failed", data: reason }
        })
    return response;
}

async function SignInService(payload: object) {
    const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(payload)
    })
        .then(async (value) => {
            if (value.status === 200) {
                const resp = await value.json();
                if (resp.status === "success") {
                    return { status: "success", data: resp.data.token }
                }
            }
        })
        .catch((reason) => {
            return { status: "failed", data: reason }
        })
    return response;
}


export { SignUpService, SignInService };

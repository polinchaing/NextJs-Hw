import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
){
    const body = await req.json();
    const {email, passowrd} = body;

    const response = await fetch (`${process.env.CAR_BASE_URL}/login`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, passowrd})
        }
    )
  console.log(`This is response: ${response}`);
    if(!response.ok){
        return NextResponse.json(
            {
                message: "Failed to login",
               
            }
        )
    }
    const data = await response.json();
    const accessToken = data?.access_token || null;
    const refreshToken = data?.refresh_token || null;
    return NextResponse.json(
        {
            message: "Login Successfully",
            token: accessToken,
            refreshToken: refreshToken
        }
    )
}

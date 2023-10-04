import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    return NextResponse.json({
        success: true,
        message: "Fucking you!!!"
    }, { status: 200 });
}
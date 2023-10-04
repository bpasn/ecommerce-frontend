import { authOption } from "@/lib/nextAuthOption";
import prismadb from "@/lib/prismadb.util";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getToken({req,secret:process.env.AUTH_SECRET});
    return NextResponse.json({
        method: req.method,
        session
    }, { status: 200 });
}
export async function POST(
    req: NextRequest
) {
    try {
        const { name } = await req.json();
        const session = await getServerSession(authOption());
        if (!session?.user?.name) {
            return new NextResponse("Unauthorization", { status: 401 });
        }
        if (!name) return new NextResponse("Name is required", { status: 400 });


        const store = await prismadb.store.create({
            data: {
                name,
                user: session?.user?.name
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        let message: string = "";
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                message = "There is a unique constraint violation, a new Store cannot be create with this name";
            }
        }
        //console.log(error);
        return new NextResponse(message || "Internal Server Error", { status: 500 });
    }
}
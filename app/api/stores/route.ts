import prismadb from "@/lib/prismadb.util";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { name } = await req.json();
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorization", { status: 401 });
        }
        if (!name) return new NextResponse("Name is required", { status: 400 });


        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        let message: string = "";
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                message = "There is a unique constraint violation, a new Store cannot be create with this name"
            }
        }
        console.log(error);
        return new NextResponse(message || "Internal Server Error", { status: 500 });
    }
}
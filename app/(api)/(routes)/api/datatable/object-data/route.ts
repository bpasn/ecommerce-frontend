import DataTableService from "@/services/dataTable/DataTable.service";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const searchParams = new URL(req.url).searchParams;
    const sDataTable:DataTableService = new DataTableService();
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");
    const _TABLE = searchParams.get("table");
    try {
        const payload = sDataTable.getData("Products",10,0)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        });
    }
};
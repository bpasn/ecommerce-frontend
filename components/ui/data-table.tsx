"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import { Pagination } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { SetStateAction, useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    onPaginationChange?: (page: number) => void;
    countData: number;
    pageLimit?: number;
    loading?: boolean;
};

const pageSize = [10, 15, 25, 50, 100];
export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    onPaginationChange,
    countData = 0,
    pageLimit = 10,
    loading = false
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        }
    });

    const [dataState, setDataState] = useState({
        pageSize: pageSize,
        pageLimit: pageLimit,
    });

    const onPageChange = (e: React.ChangeEvent<unknown>, p: number) => {
        onPaginationChange?.(p);
    };
    return (
        <div>
            {searchKey && (
                <div className="flex items-center py-4">
                    <Input
                        placeholder='Search'
                        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                        onChange={(e) =>
                            table.getColumn(searchKey)?.setFilterValue(e.target.value)
                        }
                        className='max-w-sm'
                    />
                </div>
            )}
            <div className="rounded-md border">
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead {...header.getLeafHeaders} rowSpan={2} key={header.id} >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {loading ? "Loading..." : "No Results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || !data.length}
                >
                    Prveious
                </Button>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || !data.length}>
                    Next
                </Button> */}
                <Pagination count={Math.ceil(countData / pageLimit)} onChange={onPageChange} />

            </div>
        </div>
    );
}
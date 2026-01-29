"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const MOCK_DATA = [
  { id: 1, message: "First message", createdAt: "2026-01-29 14:00" },
  { id: 2, message: "Second message from the database", createdAt: "2026-01-29 14:15" },
  { id: 3, message: "Recruitment task - table view", createdAt: "2026-01-29 14:30" },
  { id: 4, message: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ", createdAt: "2026-01-29 14:30" },

];

export function MessagesTable() {
  return (
    <div className="max-w-5xl mx-auto rounded-md border bg-white shadow-sm overflow-hidden mb-10">
      <Table className="table-fixed w-full"> 
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">ID</TableHead>
            <TableHead className="w-auto">Wiadomość</TableHead>
            <TableHead className="w-[180px] hidden md:table-cell">Data utworzenia</TableHead>
            <TableHead className="w-[120px] text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_DATA.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono text-muted-foreground align-top">
                #{item.id}
              </TableCell>
              
              <TableCell className="align-top py-4">
                <div className="max-h-[100px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                  <p className="font-medium break-words whitespace-normal text-sm text-slate-700">
                    {item.message}
                  </p>
                </div>
              </TableCell>
              
              <TableCell className="hidden md:table-cell text-sm text-gray-500 align-top py-4">
                {item.createdAt}
              </TableCell>
              
              <TableCell className="text-right align-top py-4">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
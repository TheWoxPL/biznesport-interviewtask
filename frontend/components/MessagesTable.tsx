"use client";

import { useGetMessagesQuery } from "@/store/apiSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteMessageDialog } from '@/components/DeleteMessageDialog'
import { EditMessageDialog } from '@/components/EditMessageDialog'
import { Loader2, AlertCircle } from "lucide-react";

export function MessagesTable() {
  const { data: messages, isLoading, isError } = useGetMessagesQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="text-muted-foreground animate-pulse">Pobieranie wiadomości...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-10 bg-red-50 border border-red-200 rounded-lg text-red-600 gap-3">
        <AlertCircle className="h-5 w-5" />
        <p>Nie udało się połączyć z serwerem. Sprawdź czy Docker działa.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto rounded-md border bg-white shadow-sm overflow-hidden mb-10">
      <Table className="table-fixed w-full">
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[70px]">ID</TableHead>
            <TableHead className="w-auto">Wiadomość</TableHead>
            <TableHead className="w-[180px] hidden md:table-cell">Data</TableHead>
            <TableHead className="w-[120px] text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.length ? (
            messages.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-muted-foreground align-top py-4">
                  #{item.id}
                </TableCell>
                <TableCell className="align-top py-4">
                  <div className="max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="font-medium break-words whitespace-normal text-sm text-slate-700 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-gray-500 align-top py-4">
                  {new Date(item.createdAt).toLocaleString("pl-PL")}
                </TableCell>
                <TableCell className="text-right align-top py-4">
                  <div className="flex justify-end gap-2">
                    <EditMessageDialog messageItem={item} />
                    <DeleteMessageDialog messageId={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                Baza wiadomości jest pusta.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateMessageMutation } from "@/store/apiSlice";
import { Message } from "@/types/message.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  message: z.string().min(3, "Minimum 3 znaki").max(500),
});

interface EditMessageDialogProps {
  messageItem: Message;
}

export function EditMessageDialog({ messageItem }: EditMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [updateMessage, { isLoading }] = useUpdateMessageMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: messageItem.message,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateMessage({ id: messageItem.id, message: values.message }).unwrap();
      toast({ title: "Zaktualizowano", description: "Zmiany zostały zapisane." });
      setOpen(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Błąd", description: "Nie udało się zapisać zmian." });
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj wiadomość #{messageItem.id}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Anuluj
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zapisz zmiany
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
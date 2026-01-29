"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateMessageMutation } from "@/store/apiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  message: z.string().min(3, "Wiadomość musi mieć minimum 3 znaki").max(500),
});

export function MessageForm() {
  const { toast } = useToast();
  const [createMessage, { isLoading }] = useCreateMessageMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createMessage(values).unwrap();
      toast({ title: "Sukces!", description: "Wiadomość została dodana." });
      form.reset();
    } catch (error) {
      toast({ variant: "destructive", title: "Błąd", description: `Nie udało się dodać wiadomości.` });
      console.log(error)
    }
  }

  return (
    <Card className="mb-8 border-blue-100 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700">
          <Plus className="h-4 w-4" /> Nowy wpis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Wpisz treść wiadomości..." 
                      className="bg-white" 
                      disabled={isLoading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Wyślij"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
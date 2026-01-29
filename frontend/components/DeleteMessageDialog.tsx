"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useDeleteMessageMutation } from "@/store/apiSlice";
import { useToast } from "@/hooks/use-toast";

interface DeleteMessageDialogProps {
  messageId: number;
}

export function DeleteMessageDialog({ messageId }: DeleteMessageDialogProps) {
  const { toast } = useToast();
  const [deleteMessage, { isLoading }] = useDeleteMessageMutation();

  const handleDelete = async () => {
    try {
      await deleteMessage(messageId).unwrap();
      toast({
        title: "Usunięto pomyślnie",
        description: "Wiadomość zniknęła z bazy danych.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Błąd usuwania",
        description: "Coś poszło nie tak podczas próby usunięcia wiadomości.",
      });
      console.log(error)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm" 
          className="h-8 w-8 p-0" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy jesteś pewien?</AlertDialogTitle>
          <AlertDialogDescription>
            Tej operacji nie można cofnąć. Wiadomość o ID #{messageId} zostanie 
            trwale usunięta z bazy danych.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Usuwanie..." : "Tak, usuń wiadomość"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
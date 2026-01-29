import { MessagesTable } from "@/components/MessagesTable";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen pb-20 gap-16 sm:p-10 p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-1 sm:items-start pt-4">
        Interview Task
      <section>
          <MessagesTable />
        </section>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create a new note | NoteHub",
  description: "Create and save your note in NoteHub",
  openGraph: {
    title: "Create a new note | NoteHub App",
    description: "Create and save your note in NoteHub",
    url: "https://08-zustand-9zdaz665p-igors-projects-2fd4204a.vercel.app/notes/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create Note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

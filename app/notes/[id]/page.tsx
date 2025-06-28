import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const note = await fetchNoteById(Number(params.id));
  const description =
    note.content.length > 100 ? note.content.slice(0, 100) + "..." : note.content;

  return {
    title: `Note: ${note.title}`,
    description,
    openGraph: {
      title: `Note: ${note.title}`,
      description,
      url: `https://08-zustand-9zdaz665p-igors-projects-2fd4204a.vercel.app/notes/${note.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const id = Number(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}

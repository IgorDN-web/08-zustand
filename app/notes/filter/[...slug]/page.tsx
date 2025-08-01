import { Metadata } from "next";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? "All";
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `${capitalizedTag} – Notes | NoteHub`,
    description: `Notes list with tag "${capitalizedTag}" in NoteHub.`,
    openGraph: {
      title: `${capitalizedTag} – Notes | NoteHub`,
      description: `Notes list with tag "${capitalizedTag}" in NoteHub.`,
      url: `https://08-zustand-3u212ijf9-igors-projects-2fd4204a.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Preview",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;

  const tag = slug?.[0] ?? "All";

  const initialData = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: tag === "All" ? undefined : tag,
  });

  return <NotesClient tag={tag} initialData={initialData} />;
}

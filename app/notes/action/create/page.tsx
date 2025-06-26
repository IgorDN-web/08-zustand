import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNotePage.module.css';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note in NoteHub app.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note in NoteHub app.',
    url: 'https://notehub-zustand.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  // useRouter нельзя здесь, это серверный компонент
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={() => window.history.back()} />
      </div>
    </main>
  );
}

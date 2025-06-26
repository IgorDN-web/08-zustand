'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NewNotePayload } from '@/types/note';
import { useState, useEffect } from 'react';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose?: () => void;
  onCreateNote?: (note: NewNotePayload) => void;
}

const NoteForm = ({ onClose, onCreateNote }: NoteFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [form, setForm] = useState(draft);

  useEffect(() => {
    setForm(draft);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: (note: NewNotePayload) => createNote(note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      if (onCreateNote) onCreateNote(data);
      if (onClose) onClose();
      else router.back();
    },
    onError: (error) => {
      console.error('Failed to create note:', error);
    },
  });

  const { mutate, status } = mutation;
  const isLoading = status === 'pending';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title: form.title,
      content: form.content?.trim() === '' ? undefined : form.content,
      tag: form.tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={form.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
          autoFocus
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          rows={4}
          value={form.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={form.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" disabled={isLoading} className={css.submitButton}>
          Create
        </button>
        <button
          type="button"
          disabled={isLoading}
          className={css.cancelButton}
          onClick={onClose ?? (() => router.back())}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;

import { type ReactNode } from 'react';
import { create } from 'zustand';

type ModalStore = {
  content: ReactNode | null;
  title: string | null;
};

export const useModalStore = create<ModalStore>(() => ({
  content: null,
  title: null,
}));

export const closeModal = () => useModalStore.setState({ content: null, title: null });
export const openModal = (
  content: ReactNode,
  title?: ModalStore['title'],
) => useModalStore.setState({ content, title: title ?? null });

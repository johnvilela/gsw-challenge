import { useState } from "react";

export type Banknotes = { [key in '100' | '50' | '20' | '10']?: number };

export const defaultValue = {
  '100': 50,
  '50': 50,
  '20': 50,
  '10': 50
}

export function useBanknotes() {
  const [notesAmount, setNotesAmount] = useState<Banknotes>(() => {
    const notesAmount = localStorage.getItem('@GSW:notesAmount');

    if (notesAmount) {
      return JSON.parse(notesAmount);
    } else {
      return defaultValue;
    }
  });

  function saveNotesAmount() {
    localStorage.setItem('@GSW:notesAmount', JSON.stringify(notesAmount));
  }

  return { notesAmount, setNotesAmount, saveNotesAmount }
}
'use client';

import { ButtonHTMLAttributes, ReactNode } from "react"
import { CgSpinner } from 'react-icons/cg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  customClass?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'neutral';
  isLoading?: boolean;
}

const buttonTypes = {
  primary: 'bg-pink-500 text-white',
  secondary: 'bg-white text-pink-500',
  tertiary: 'bg-transparent text-yellow-500',
  danger: 'bg-red-500 text-white',
  neutral: 'bg-transparent text-teal-100',
}

export function Button({ children, variant = 'primary', customClass = "", isLoading = false, ...rest }: ButtonProps) {
  return (
    <button className={`${customClass} ${buttonTypes[variant]} flex justify-center w-full font-bold rounded-full px-4 py-2 duration-200 cursor-pointer hover:brightness-75`} {...rest}>
      {isLoading ? <CgSpinner size='1.5rem' className="animate-spin" /> : children}
    </ button>
  )
}
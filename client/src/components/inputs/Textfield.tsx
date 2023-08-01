'use client';

import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType
  label?: string
}

export function Textfield({ icon: Icon, label, id, ...rest }: TextfieldProps) {
  return (
    <div>
      {label && <label htmlFor={id} className="text-teal-100 font-semibold">{label}</label>}
      <div data-testid='input-container' className="w-full flex items-center gap-2 bg-teal-200 rounded-md p-1 duration-200 border-4 border-teal-200 focus-within:border-pink-500 text-teal-950">
        {Icon && <Icon data-testid='icon' size='1.5rem' />}
        <input id={id} data-testid='input' className="placeholder:text-teal-900" {...rest} />
      </div>
    </div>
  )
}
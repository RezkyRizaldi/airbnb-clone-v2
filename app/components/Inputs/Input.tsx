'use client';

import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, label, type = 'text', disabled, formatPrice, required, register, errors }) => {
	return (
		<div className="relative w-full">
			{formatPrice && <BiDollar className="absolute left-2 top-5 text-neutral-700" size={24} />}
			<input
				id={id}
				className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${formatPrice ? 'pl-9' : 'pl-4'} ${
					errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'
				}`}
				disabled={disabled}
				placeholder=" "
				type={type}
				{...register(id, { required })}
			/>
			<label
				className={`absolute top-5 z-10 origin-top-left -translate-y-3 transform duration-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
					formatPrice ? 'left-9' : 'left-4'
				} ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;

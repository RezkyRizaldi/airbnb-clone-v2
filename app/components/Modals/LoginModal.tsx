'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Modal from './Modal';

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account!" />
			<Input id="email" label="Email" type="email" disabled={isLoading} register={register} errors={errors} required />
			<Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
		</div>
	);

	const footerContent = (
		<div className="mt-3 flex flex-col gap-4">
			<hr />
			<Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
			<Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn('github')} />
			<div className="mt-4 text-center font-light text-neutral-400">
				<div className="flex items-center justify-center gap-2">
					<div>First time using Airbnb?</div>
					<div className="cursor-pointer text-neutral-800 hover:underline" onClick={toggle}>
						Create an account
					</div>
				</div>
			</div>
		</div>
	);

	return <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Continue" onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />;
};

export default LoginModal;

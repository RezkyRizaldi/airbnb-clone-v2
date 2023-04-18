'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import type { SafeUser } from '@/app/types';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const rentModal = useRentModal();
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className="relative">
			<div className="flex items-center gap-3">
				<button className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block" type="button" onClick={onRent}>
					Airbnb your home
				</button>
				<button className="flex items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1" type="button" onClick={toggleOpen}>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</button>
			</div>
			{isOpen && (
				<div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
					<div className="flex cursor-pointer flex-col">
						{currentUser ? (
							<>
								<MenuItem onClick={() => router.push('/trips')} label="My Trips" />
								<MenuItem onClick={() => router.push('/favorites')} label="My Favorites" />
								<MenuItem onClick={() => router.push('/reservations')} label="My Reservations" />
								<MenuItem onClick={() => router.push('/properties')} label="My Properties" />
								<MenuItem onClick={rentModal.onOpen} label="Airbnb My Home" />
								<hr />
								<MenuItem onClick={() => signOut()} label="Logout" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label="Login" />
								<MenuItem onClick={registerModal.onOpen} label="Sign Up" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;

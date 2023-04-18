'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorites from '../hooks/useFavorites';
import type { SafeUser } from '../types';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
	const { hasFavorited, toggleFavorite } = useFavorites({ listingId, currentUser });

	return (
		<div className="relative cursor-pointer transition hover:opacity-80" onClick={toggleFavorite}>
			<AiOutlineHeart className="absolute -right-0.5 -top-0.5 fill-white" size={28} />
			<AiFillHeart className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} size={24} />
		</div>
	);
};

export default HeartButton;

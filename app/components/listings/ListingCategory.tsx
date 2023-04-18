'use client';

import type { IconType } from 'react-icons';

interface ListingCategoryProps {
	icon: IconType;
	label: string;
	description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({ icon: Icon, label, description }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-4">
				<Icon className="text-neutral-600" size={40} />
				<div className="flex flex-col">
					<div className="text-lg font-semibold">{label}</div>
					<div className="font-light text-neutral-500">{description}</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCategory;

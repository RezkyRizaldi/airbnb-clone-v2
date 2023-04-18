'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const handleupload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleupload}
			uploadPreset="ofmzcnnt"
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => (
				<div className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70" onClick={() => open?.()}>
					<TbPhotoPlus size={50} />
					<div className="text-lg font-semibold">Click to upload</div>
					{value && (
						<div className="absoluet inset-0 h-full w-full">
							<Image className="object-cover" alt="Upload" fill src={value} />
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	);
};

export default ImageUpload;

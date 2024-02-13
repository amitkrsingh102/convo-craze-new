"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "../Modal";
import Button from "../Button";
import Input from "../inputs/Input";

interface SettingsModalProps {
	currentUser: User;
	isOpen?: boolean;
	onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
	currentUser,
	isOpen,
	onClose,
}) => {
	const router = useRouter();
	const [isLoading, isLoadingSet] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});

	const image = watch("image");

	const handleUpload = (result: any) => {
		setValue("image", result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		isLoadingSet(true);

		axios
			.post(`/api/settings`, data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => {
				toast.error("Something went wrong!");
			})
			.finally(() => {
				isLoadingSet(false);
			});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Profile
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Edit your public information
						</p>
						<div className="mt-10 flex flex-col gap-y-8">
							<Input
								disabled={isLoading}
								label="name"
								id="name"
								errors={errors}
								register={register}
							/>
							<div>
								<label className="block text-sm font-medium leading-6 text-gray-900 outline-none    ">
									Photo
								</label>
								<div className="mt-2 flex items-center gap-x-3">
									<Image
										alt="avatar"
										src={image || "/images/placeholder.png"}
										width={48}
										height={48}
										className="rounded-full"
									/>
									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset="kbp6u5pn"
										className="outline-none"
									>
										<Button
											disabled={isLoading}
											secondary
											type="button"
										>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-end gap-x-6">
						<Button
							disabled={isLoading}
							secondary
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button disabled={isLoading} type="submit">
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default SettingsModal;

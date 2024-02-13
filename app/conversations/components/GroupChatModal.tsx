"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";

interface GroupChatModalProps {
	isOpen?: boolean;
	onClose: () => void;
	users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
	isOpen,
	onClose,
	users,
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
			name: "",
			members: [],
		},
	});
	const members = watch("members");

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		isLoadingSet(true);

		axios
			.post("/api/conversations", { ...data, isGroup: true })
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
					<div className="border-b border-l-gray-900/10 pb-12 ">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Create a group chat
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Create a chat with more than two people.
						</p>
						<div className="mt-10 flex flex-col gap-y-8">
							<Input
								register={register}
								label="Name"
								id="name"
								disabled={isLoading}
								required
								errors={errors}
							/>

							<Select
								disabled={isLoading}
								label="Members"
								options={users.map((user) => ({
									value: user.id,
									label: user.name,
								}))}
								onChange={(value) =>
									setValue("members", value, {
										shouldValidate: true,
									})
								}
								value={members}
							/>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-6">
					<Button
						disabled={isLoading}
						onClick={onClose}
						secondary
						type="button"
					>
						Cancel
					</Button>
					<Button disabled={isLoading} type="submit">
						Create
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;

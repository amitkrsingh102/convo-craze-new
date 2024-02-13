"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import ImageModal from "./ImageModal";
import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";

interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
	const session = useSession();
	const [imageModalOpen, imageModalOpenSet] = useState(false);

	const isOwn = session?.data?.user?.email === data.sender.email;

	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(", ");

	const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
	const avatar = clsx(isOwn && "order-2");
	const body = clsx("flex flex-col gap-2", isOwn && "items-end");
	const message = clsx(
		"text-sm w-fit overflow-hidden",
		isOwn
			? "bg-blue-600 text-white rounded-tr-none"
			: "bg-lime-300 rounded-tl-none",
		data?.image ? "rounded-md p-0" : "rounded-xl py-2 px-3"
	);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>
			<div className={body}>
				<div className="flex items-center gap-1">
					<div className="text-sm text-gray-500">
						{data.sender.name === session.data?.user?.name
							? "You"
							: data.sender.name}
					</div>
					<div className="text-xs text-gray-400">
						{format(new Date(data.createdAt), "p")}
					</div>
				</div>
				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={() => {
							imageModalOpenSet(false);
						}}
					/>
					{data.image ? (
						<Image
							alt="image"
							height={288}
							width={288}
							src={data.image}
							className="object-cover cursor-pointer hover:scale-110 transition translate"
							onClick={() => {
								imageModalOpenSet(true);
							}}
						/>
					) : (
						<div>{data.body}</div>
					)}
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className="text-xs font-light text-gray-500">
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageBox;

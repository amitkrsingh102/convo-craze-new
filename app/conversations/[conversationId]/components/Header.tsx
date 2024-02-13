"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import ProfileDrawer from "./ProfileDrawer";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";
import AvatarGroup from "@/app/components/AvatarGroup";

interface HeaderProps {
	conversations: Conversation & {
		users: User[];
	};
}

const Header: React.FC<HeaderProps> = ({ conversations }) => {
	const otherUser = useOtherUser(conversations);
	const { members } = useActiveList();
	const isActive = members.indexOf(otherUser.email!) !== -1;

	const [drawerOpen, drawerOpenSet] = useState(false);

	const statusText = useMemo(() => {
		if (conversations.isGroup) {
			return `${conversations.users.length} members`;
		}
		return isActive ? "Active" : "Offline";
	}, [conversations, isActive]);
	return (
		<>
			<ProfileDrawer
				data={conversations}
				isOpen={drawerOpen}
				onClose={() => drawerOpenSet(false)}
			/>
			<div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
				<div className="flex gap-3 items-center">
					<Link
						href="/conversations"
						className="lg:hidden block text-blue-700 hover:text-blue-500 cursor-pointer transition"
					>
						<HiChevronLeft size={32} />
					</Link>
					{conversations.isGroup ? (
						<AvatarGroup users={conversations.users} />
					) : (
						<Avatar user={otherUser} />
					)}
					<div className="flex flex-col">
						<div>{conversations.name || otherUser.name}</div>
						<div className="text-sm font-light text-neutral-500">
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					size={32}
					onClick={() => {
						drawerOpenSet(true);
					}}
					className="text-blue-700 cursor-pointer hover:text-blue-500 transition"
				/>
			</div>
		</>
	);
};

export default Header;

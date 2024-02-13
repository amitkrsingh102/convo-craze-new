import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const conversations = await getConversations();
	const users = await getUsers();

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList initialItems={conversations} users={users} />
				{children}
			</div>
		</Sidebar>
	);
}

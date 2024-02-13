import getUsers from "../actions/getUsers";
import UserList from "./components/UsersList";
import Sidebar from "../components/sidebar/Sidebar";

export default async function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const users = await getUsers();
	return (
		<Sidebar>
			<div className="h-full">
				<UserList items={users} />
				{children}
			</div>
		</Sidebar>
	);
}

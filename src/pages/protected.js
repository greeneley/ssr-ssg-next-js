import { signOut, useSession } from "next-auth/react";

export default function Protected() {
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated: () => {
			window.location.href = "auth/signin";
		}
	});

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Protected Page</h1>
			<p>Welcome, {session.user.name || session.user.email}!</p>
			<button
				onClick={() => signOut({ callbackUrl: "/auth/signin" })}
				className="bg-red-600 text-white p-2 rounded mt-4">
				Sign Out
			</button>
		</div>
	);
}

import posts from "../data/posts.json";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-8 text-center">My Static Blog</h1>
			{session ? (
				<div>
					<p>Signed in as {session.user.email}</p>
					<Link href="/protected" className="text-blue-600 hover:underline">
						Go to Protected Page
					</Link>
				</div>
			) : (
				<div>
					<p>Not signed in</p>
					<Link href="/auth/signin" className="text-blue-600 hover:underline">
						Sign In
					</Link>
					<br />
					<Link href="/auth/signup" className="text-blue-600 hover:underline">
						Sign Up
					</Link>
				</div>
			)}
			<div className="grid gap-4">
				{posts.map((post) => (
					<div key={post.id} className="border p-4 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold">
							<Link href={`/posts/${post.slug}`}>{post.title}</Link>
						</h2>
						<p className="text-gray-600">{post.date}</p>
					</div>
				))}
			</div>
		</div>
	);
}

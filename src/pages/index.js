import posts from "../data/posts.json";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-8 text-center">My Static Blog</h1>
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

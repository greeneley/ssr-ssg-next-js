import posts from "../../data/posts.json";
import Head from "next/head";
import Link from "next/link";
export async function getStaticPaths() {
	const paths = posts.map((post) => ({
		params: { slug: post.slug }
	}));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const post = posts.find((p) => p.slug === params.slug);
	return { props: { post } };
}

export default function Post({ post }) {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>{post.title} | My Static Blog</title>
				<meta name="description" content={post.content.slice(0, 150)} />
			</Head>
			<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
			<p className="text-gray-600 mb-4">{post.date}</p>
			<div className="prose">{post.content}</div>
			<Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
				Back to Home
			</Link>
		</div>
	);
}

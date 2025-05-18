import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps({ params }) {
	try {
		const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
		return {
			props: {
				product: response.data
			}
		};
	} catch (error) {
		console.log("error fetching products: ", error);
		return {
			props: {
				products: []
			}
		};
	}
}

export default function ProductDetail({ product }) {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>{product.title} | My Static Blog</title>
				<meta name="description" content={product.body.slice(0, 150)} />
			</Head>
			<h1 className="text-4xl font-bold mb-4">{product.title}</h1>
			<div className="prose">{product.body}</div>
			<Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
				Back to Products
			</Link>
		</div>
	);
}

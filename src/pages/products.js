import Head from "next/head";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps() {
	try {
		const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
		const products = response.data.slice(0, 10);
		return {
			props: {
				products
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
export default function Products({ products }) {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>Product List | My SSR App</title>
				<meta name="description" content="List of products fetched dynamically with SSR" />
			</Head>
			<h1 className="text-4xl font-bold mb-8 text-center">Product List</h1>
			{products.length === 0 ? (
				<p className="text-center text-red-500">No products available</p>
			) : (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<div key={product.id} className="border p-4 rounded-lg shadow-md">
							<Link href={`/products/${product.id}`} className="text-xl font-semibold hover:underline">
								{product.title}
							</Link>
							<p className="text-gray-600">{product.body}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

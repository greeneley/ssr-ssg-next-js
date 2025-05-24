import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password
		});

		if (result.error) {
			setError("Invalid email or password");
		} else {
			window.location.href = "/protected"; // Chuyển hướng sau khi đăng nhập
		}
	};
	return (
		<div className="container mx-auto p-4 max-w-md">
			<h1 class="text-3xl font-bold mb-6 text-center">Sign In</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
					Sign In
				</button>
			</form>
			<div className="mt-6 text-center">
				<p>Or sign in with:</p>
				<button className="bg-red-600 text-white p-2 rounded mt-2 w-full">Google</button>
				<button className="bg-gray-800 text-white p-2 rounded mt-2 w-full">GitHub</button>
			</div>
		</div>
	);
}

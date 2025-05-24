import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/api/signup", { email, password, name });
			router.push("/auth/signin");
		} catch (err) {
			console.error("Signup error:", err);
			let errorMessage = "An error occurred";
			if (err.response && err.response.data && err.response.data.error) {
				errorMessage = err.response.data.error;
			} else if (err.message) {
				errorMessage = err.message;
			}
			setError(errorMessage);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-md">
			<h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border rounded"
						required
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
				<button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
					Sign Up
				</button>
			</form>
		</div>
	);
}

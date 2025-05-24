import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Singleton pattern for PrismaClient
let prisma;
if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { email, password, name } = req.body;

	try {
		// Validate input
		if (!email || !password || !name) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Check if user exists
		const existingUser = await prisma.user.findUnique({
			where: { email }
		});
		if (existingUser) {
			return res.status(400).json({ error: "Email already exists" });
		}

		// Hash password and create user
		const hashedPassword = bcrypt.hashSync(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name
			}
		});

		res.status(201).json({ message: "User created", userId: user.id });
	} catch (err) {
		console.error("API signup error:", err);
		res.status(500).json({ error: err.message || "Internal server error" });
	}
}

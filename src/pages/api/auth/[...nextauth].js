import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import axios from "axios";

const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma), // Lưu session vào database
	providers: [
		// Xác thực email/mật khẩu
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				// Gọi API backend hoặc kiểm tra database
				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				});

				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return { id: user.id, name: user.name, email: user.email };
				}

				// Gọi API backend (ví dụ JSONPlaceholder để demo)
				/* 
				const response = await axios.post('https://your-backend-api/auth', {
					email: credentials.email,
					password: credentials.password,
				});
				if (response.data.user) {
					return response.data.user;
				}
				*/

				return null; // Trả về null nếu xác thực thất bại
			}
		}),
		// Đăng nhập Google
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		// Đăng nhập GitHub
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt" // Sử dụng JWT cho session
	},
	callbacks: {
		async session({ session, token }) {
			// Thêm thông tin user vào session
			session.user.id = token.sub;
			return session;
		}
	},
	pages: {
		signIn: "/auth/signin" // Trang đăng nhập tùy chỉnh
	}
});

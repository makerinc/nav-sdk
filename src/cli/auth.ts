import { existsSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import path from "path";
import open from "open";
import http from "http";
import { URL } from "url";
import dotenv from "dotenv";
import os from "os";
import chalk from "chalk";
import jsonwebtoken from "jsonwebtoken";
import getPort from "get-port";

const AUTH_TOKEN_ENV_VAR = "AUTH_TOKEN";
const ENV_FILE_PATH = path.join(os.homedir(), ".nav-sdk.env");

const NAV_EDITOR_URL_PROD = "https://nav.maker.co";
const NAV_EDITOR_URL_DEV = "http://localhost:3000";
const API_URL_DEV = "https://api-git-master-makerco.vercel.app";
const API_URL_PROD = "https://api.maker.co";

function loadEnvVars(): void {
	if (existsSync(ENV_FILE_PATH)) {
		const envConfig = dotenv.parse(readFileSync(ENV_FILE_PATH));
		for (const key in envConfig) {
			process.env[key] = envConfig[key];
		}
	}
}

/**
 * Saves the authentication token to the .nav-sdk.env file
 * @param token - The authentication token to save
 */
function saveToken(token: string): void {
	const envContent = `${AUTH_TOKEN_ENV_VAR}=${token}\n`;
	writeFileSync(ENV_FILE_PATH, envContent);
	process.env[AUTH_TOKEN_ENV_VAR] = token;
}

/**
 * Delete the authentication token from the .nav-sdk.env file
 */
function deleteToken(): void {
	const existingToken = process.env[AUTH_TOKEN_ENV_VAR];
	if (existingToken) {
		delete process.env[AUTH_TOKEN_ENV_VAR];
	}
	if (existsSync(ENV_FILE_PATH)) {
		unlinkSync(ENV_FILE_PATH);
	}
}

/**
 * Validates the authentication token against the API
 * @param token - The token to validate
 * @returns A promise that resolves to true if the token is valid
 */
async function validateToken(token: string, verbose: boolean = false, isDev: boolean = false): Promise<boolean> {
	try {
		let decoded = jsonwebtoken.decode(token);
		if (!decoded) {
			verbose && console.error("Failed to decode token");
			return false;
		}
		let expireAt = (decoded as jsonwebtoken.JwtPayload).exp;
		if (!expireAt) {
			verbose && console.error("Token does not contain expiration date");
			return false;
		}
		expireAt = expireAt * 1000;
		if (expireAt && expireAt < Date.now()) {
			verbose && console.error("Token is likely expired");
			return false;
		}
		let accountId = (decoded as jsonwebtoken.JwtPayload).accountId;
		if (!accountId) {
			verbose && console.error("Token does not contain accountId");
			return false;
		}
		const response = await fetch(`${isDev ? API_URL_DEV : API_URL_PROD}/api/get_account?account_id=${accountId}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) {
			verbose && console.error("Failed to validate token");
			return false;
		}
		return true;
	} catch (error) {
		console.error("Token validation error:", error);
		return false;
	}
}

/**
 * Checks if the user is already logged in
 * @returns A promise that resolves to true if the user is logged in
 */
export async function isLoggedIn(): Promise<boolean> {
	const existingToken = process.env[AUTH_TOKEN_ENV_VAR];

	if (existingToken) {
		const isValid = await validateToken(existingToken);
		if (isValid) {
			console.log(chalk.green("You are already logged in."));
			return true;
		}
	}

	return false;
}

/**
 * Handles the login process for Nav SDK
 * Opens a browser for authentication and captures the token
 * @param args - Command line arguments (not used)
 */
export async function startLoginServer(isDev: boolean = false): Promise<void> {
	const server = http.createServer();
	const port = await getPort({ port: 3333 });

	const authPromise = new Promise<string>((resolve, reject) => {
		const timeout = setTimeout(() => {
			server.close();
			reject(new Error("Login timed out after 5 minutes"));
		}, 5 * 60 * 1000);

		server.on("request", (req, res) => {
			if (!req.url) {
				return;
			}

			const url = new URL(req.url, `http://localhost:${port}`);
			const token = url.searchParams.get("token");

			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(`
				<html>
				<body>
					<h1>Authentication Successful</h1>
					<p>You can now close this window and return to the CLI.</p>
					<script>window.close();</script>
				</body>
				</html>
			`);

			clearTimeout(timeout);
			server.close();

			if (token) {
				resolve(token);
			} else {
				reject(new Error("No token received"));
			}
		});

		server.on("error", (err) => {
			clearTimeout(timeout);
			server.close();
			reject(err);
		});
	});

	server.listen(port, () => {
		console.log(`Listening for authentication callback on port ${port}`);
	});

	const loginUrl = `${isDev ? NAV_EDITOR_URL_DEV : NAV_EDITOR_URL_PROD}/editor/sign-in?redirect_url=/connect_cli_done%3Fport=${port}`;

	try {
		await open(loginUrl);
		console.log(chalk.cyan("Browser opened for authentication. Please log in..."));

		const token = await authPromise;

		saveToken(token);

		console.log(chalk.green("Login successful."));

		process.exit(0);
	} catch (error) {
		console.error("Login error:", error);
		console.log(chalk.red(`Login failed: ${error}`));
	}
}

/**
 * Checks if the user is already logged in and opens a browser for authentication
 * @param args - Command line arguments
 * @returns A promise that resolves when successfully logged in
 */
export async function login(args: string[]): Promise<void> {
	loadEnvVars();

	let isDev = args.includes("--dev");

	console.log("Checking existing login...");
	if (await isLoggedIn()) {
		console.log(chalk.green("You are already logged in."));
		return;
	}

	console.log("Logging in...");
	await startLoginServer(isDev);
}

/**
 * Logs out the user by deleting the authentication token
 */
export async function logout(_: string[]) {
	console.log("Logging out...");
	deleteToken();
	console.log(chalk.green("Logout successful."));
}
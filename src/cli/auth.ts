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
 * Fetch Maker API securely using the authentication token
 * @param path - The path to fetch
 * @param headers - Additional headers to send with the request
 * @param verbose - Whether to print verbose output
 * @param isDev - Whether to use the development API URL
 * @returns A promise that resolves to the response from the API
 */
async function secureApiFetch(path: string, headers: Headers | undefined = undefined, verbose: boolean = false, isDev: boolean = false): Promise<Response> {
	path = path.startsWith("/") ? path : "/" + path;
	const url = (isDev ? API_URL_DEV : API_URL_PROD) + path;

	verbose && console.log("Fetching: ", url)

	const token = process.env[AUTH_TOKEN_ENV_VAR];
	headers = headers || new Headers()
	headers.append("Authorization", `Bearer ${token}`);

	let fetchResponse = await fetch(url, { headers });
	if (!fetchResponse.ok) {
		verbose && console.error(chalk.red("Failed to fetch from API:"), fetchResponse.status, fetchResponse.statusText);
	} else {
		verbose && console.log(chalk.green("Fetched from API successfully"));
	}

	return fetchResponse;
}

/**
 * Validates the authentication token against the API
 * @param token - The token to validate
 * @param verbose - Whether to print verbose output
 * @param isDev - Whether to use the development API URL
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
		const response = await secureApiFetch(`/api/get_account?account_id=${accountId}`, undefined, verbose, isDev);
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
 * @param verbose - Whether to print verbose output
 * @param isDev - Whether to use the development API URL
 * @returns A promise that resolves to true if the user is logged in
 */
export async function isLoggedIn(verbose: boolean = false, isDev: boolean = false): Promise<boolean> {
	const existingToken = process.env[AUTH_TOKEN_ENV_VAR];

	verbose && console.log("Checking existing token...");
	if (existingToken) {
		verbose && console.log("Token found. Validating token...");
		const isValid = await validateToken(existingToken, verbose, isDev);
		if (isValid) {
			verbose && console.log("Token is valid");
			return true;
		} else {
			verbose && console.log("Token is invalid");
		}
	} else {
		verbose && console.log("No token found");
	}

	return false;
}

/**
 * Handles the login process for Nav SDK
 * Opens a browser for authentication and captures the token
 * @param args - Command line arguments (not used)
 */
export async function startLoginServer(verbose: boolean = false, isDev: boolean = false): Promise<void> {
	const server = http.createServer();
	const port = await getPort({ port: 3333 });

	verbose && console.log(`Listening for authentication callback on port ${port}`);

	const authPromise = new Promise<string>((resolve, reject) => {
		verbose && console.log("Waiting for authentication callback...");
		const timeout = setTimeout(() => {
			verbose && console.log("Login timed out after 5 minutes of inactivity");
			server.close();
			reject(new Error("Login timed out after 5 minutes"));
		}, 5 * 60 * 1000);

		server.on("request", (req, res) => {
			if (!req.url) {
				verbose && console.log("No URL received");
				return;
			}

			const url = new URL(req.url, `http://localhost:${port}`);
			const token = url.searchParams.get("token");

			verbose && console.log(`Received token: ${token}`);

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

			verbose && console.log("Closing server...");
			server.close();

			if (token) {
				verbose && console.log("Resolving token...");
				resolve(token);
			} else {
				verbose && console.log("No token received");
				reject(new Error("No token received"));
			}
		});

		server.on("error", (err) => {
			verbose && console.log("Server error:", err, ". Going to nap...");
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

	let isDev = args.includes("--dev") || args.includes("-d");
	let verbose = args.includes("--verbose") || args.includes("-v");

	if (await isLoggedIn(verbose, isDev)) {
		console.log(chalk.green("You are already logged in."));
		return;
	}

	console.log("Logging in...");
	await startLoginServer(verbose, isDev);
}

/**
 * Logs out the user by deleting the authentication token
 */
export async function logout(_: string[]) {
	console.log("Logging out...");
	deleteToken();
	console.log(chalk.green("Logout successful."));
}
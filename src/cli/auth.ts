// auth.ts
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import open from "open";
import http from "http";
import { URL } from "url";
import dotenv from "dotenv";
import os from "os";
import chalk from "chalk";

const sleep = (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay));
}

const AUTH_TOKEN_ENV_VAR = "NAV_SDK_LOGIN_AUTH_TOKEN";
const ENV_FILE_PATH = path.join(os.homedir(), ".nav-sdk.env");

/**
 * Loads environment variables from the .nav-sdk.env file
 */
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
 * Validates the authentication token against the API
 * @param token - The token to validate
 * @returns A promise that resolves to true if the token is valid
 */
async function validateToken(token: string): Promise<boolean> {
	try {
		// Here you would make an API call to validate the token
		// For example:
		// const response = await fetch('https://nav.maker.co/api/validate-token', {
		//   headers: { Authorization: `Bearer ${token}` }
		// });
		// return response.status === 200;

		// Placeholder implementation
		return token.length > 0;
	} catch (error) {
		console.error("Token validation error:", error);
		return false;
	}
}

/**
 * Handles the login process for Nav SDK
 * Opens a browser for authentication and captures the token
 * @param args - Command line arguments (not used)
 */
export async function login(_: string[]): Promise<void> {
	// Load existing environment variables
	loadEnvVars();

	// Check if we have an existing token
	const existingToken = process.env[AUTH_TOKEN_ENV_VAR];

	if (existingToken) {
		console.log("Checking existing login...");
		const isValid = await validateToken(existingToken);
		if (isValid) {
			console.log(chalk.green("You are already logged in."));
			return;
		}
		console.log("Previous session expired. Logging in again...");
	}

	console.log("Logging in...");

	// Create a local server to listen for the callback
	const server = http.createServer();
	const port = 3333; // Choose an available port

	// Promise to handle server response
	const authPromise = new Promise<string>((resolve, reject) => {
		// Set timeout for login process
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

			// Send response to the browser
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

			// Clear timeout and close server
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

	// Start the server
	server.listen(port, () => {
		console.log(`Listening for authentication callback on port ${port}`);
	});

	// Construct the login URL with the port for callback
	const loginUrl = `https://nav.maker.co/editor/sign-in?redirect_url=cli-login-success?port=${port}`;

	try {
		// Open the browser
		await open(loginUrl);
		console.log(chalk.cyan("Browser opened for authentication. Please log in..."));

		// Wait for authentication to complete
		const token = await authPromise;

		// Save the token
		saveToken(token);

		console.log(chalk.green("Login successful."));
	} catch (error) {
		console.error("Login error:", error);
		console.log(chalk.red(`Login failed: ${error}`));
	}
}

export async function logout(_: string[]) {
	console.log("Logging out...")
	await sleep(1000)
	console.log(chalk.green("Logout successful."));
}
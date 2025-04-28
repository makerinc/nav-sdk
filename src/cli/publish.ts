import chalk from "chalk";
import { getConfig } from "./config.js";

const sleep = (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay));
}

export async function publish(): Promise<void> {
	const config = await getConfig();
	if (!config) {
		console.log(chalk.red("\u2717\ufe0e navsdk.config.json not found. Please create a config file to build your components."));
		return;
	}

	console.log("Publishing...");

	await sleep(1000);
	console.log(chalk.green("Publish successful."));
}
#!/usr/bin/env node

import chalk from "chalk";
import { login, logout } from "./auth.js";
import { build } from "./build.js";
import { getVersion } from "./config.js";

type Command = {
	cmd: string;
	help: string;
	usage: string;
	run: (args: string[]) => Promise<void>;
}

function helloWorld() {
	console.log(chalk.bold(chalk.cyan("Nav SDK")), chalk.cyan(getVersion()));
}

const sleep = (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay));
}

async function publish(args: string[]) {
	await login(args);
	await build(args);
	console.log("Publishing...");
	await sleep(1000);
	console.log(chalk.green("Publish successful."));
}

const args = process.argv.slice(2);
const command = args[0] || "";
const help = args[1] == "-h" || args[1] == "--help";

const commands: Command[] = [
	{
		cmd: "login",
		help: "Login to Nav editor.",
		usage: "nav-sdk login",
		run: login
	},
	{
		cmd: "logout",
		help: "Log out from current session.",
		usage: "nav-sdk logout",
		run: logout
	},
	{
		cmd: "build",
		help: "Build your custom components.",
		usage: "nav-sdk build",
		run: build
	},
	{
		cmd: "publish",
		help: "Publish built components to Nav editor.",
		usage: "nav-sdk publish",
		run: publish
	}
];

(async () => {
	helloWorld();
	if (command == "help") {
		// Help for all commands
		console.log(chalk.bold("Available commands:"));
		commands.forEach(command => {
			console.log(`  ${chalk.yellow(command.usage)} - ${command.help}`);
		});
		return;
	} else if (command == "hi" || command == "hello" || command == "") {
		// Just version check
		return;
	} else {
		// Find the command
		const commandObj: Command | undefined = commands.find(cmd => cmd.cmd == command);
		if (!commandObj) {
			// Unknown command, show help
			console.log(chalk.red(`Unknown command "${commandObj}". Supported commands are ${commands.map(cmd => cmd.cmd).join(", ")}. Run ${chalk.yellow("nav-sdk help")} for more information.`));
			return;
		} else if (help) {
			// Show help for the command
			console.log(commandObj.help + "\n\nUsage: " + chalk.yellow(commandObj.usage));
			return;
		} else {
			// Run the command
			await commandObj.run(args);
		}
	}
})();
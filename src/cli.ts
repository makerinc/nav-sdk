#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import esbuild from "esbuild";
import { parse as reactDocParse } from "react-docgen";
import fg from "fast-glob";
import chalk from "chalk";
import { execSync } from "child_process";

const NAVSDK_CONFIG_FILE_NAME = "navsdk.config.json";

type Config = {
	paths: string[];
	outputDir: string;
}

type Command = {
	cmd: string;
	help: string;
	usage: string;
	run: (args: string[]) => Promise<void>;
}

function getVersion() {
	try {
		const output = execSync(`npm list -g @makerinc/nav-sdk --depth=0 --json`, { encoding: "utf-8" });
		const parsed = JSON.parse(output);
		return parsed.dependencies?.["@makerinc/nav-sdk"]?.version || chalk.red("No version detected");
	} catch (error) {
		return chalk.red("No version detected");
	}
}

function helloWorld() {
	console.log(chalk.bold(chalk.cyan("Nav SDK")), chalk.cyan(getVersion()));
}

function makeNewConfig(): Config {
	return {
		paths: [
			"src/components/**/*.tsx",
			"src/components/**/*.ts",
			"src/components/**/*.jsx",
			"src/components/**/*.js",
		],
		outputDir: "node_modules/.nav-sdk"
	}
}

async function getConfig(): Promise<Config> {
	const configPath = path.join(process.cwd(), NAVSDK_CONFIG_FILE_NAME);
	if (!existsSync(configPath)) {
		let newConfig = makeNewConfig();
		writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
		return newConfig;
	}
	const config = JSON.parse(readFileSync(configPath, "utf-8"));
	return config;
}

async function buildComponent(componentPath: string, config: Config): Promise<boolean> {
	const componentName = path.basename(componentPath, path.extname(componentPath));
	const componentOutFile = path.join(config.outputDir, `${componentName}.js`);
	const reactdocOutFile = path.join(config.outputDir, `${componentName}.doc.json`);

	try {
		await esbuild.build({
			entryPoints: [componentPath],
			bundle: true,
			minify: true,
			outfile: componentOutFile,
			jsx: "automatic",
			format: "esm",
			platform: "browser",
			external: ["react", "react-dom"],
		});


		const componentCode = readFileSync(componentPath, "utf-8");
		const metadataArray = reactDocParse(componentCode);
		const metadata = metadataArray[0];

		if (!metadata || !metadata.props) {
			console.log(chalk.red("\u2717\ufe0e No props found for the component " + componentPath));
			return false;
		}

		writeFileSync(reactdocOutFile, JSON.stringify(metadata, null, 2));

		console.log(chalk.green("\u2714\ufe0e Built " + componentOutFile));
		return true;
	} catch (error) {
		console.log(chalk.red(`\u2717\ufe0e Failed to build ${componentPath} - ${error}`));
		return false;
	}
}

const sleep = (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay));
}

async function login(_: string[]) {
	console.log("Logging in...")
	await sleep(1000)
	console.log(chalk.green("Login successful."));
}

async function logout(_: string[]) {
	console.log("Logging out...")
	await sleep(1000)
	console.log(chalk.green("Logout successful."));
}

async function buildComponents(_: string[]): Promise<boolean> {
	const config = await getConfig();
	if (!config) {
		console.log(chalk.red("\u2717\ufe0e navsdk.config.json not found. Please create a config file to build your components."));
		return false;
	}

	let files: string[] = await fg(config.paths);

	console.log("Building components...");

	let buildSuccessCount = 0;
	let buildFailureCount = 0;

	await Promise.all(files.map(async (file) => {
		const success = await buildComponent(file, config);
		if (success) {
			buildSuccessCount++;
		} else {
			buildFailureCount++;
		}
	}));

	if (buildFailureCount > 0) {
		console.log(chalk.bold(chalk.red(`\u2717\ufe0e ${buildFailureCount} component${buildFailureCount > 1 ? "s" : ""} failed to build.`)));
		return false;
	} else if (buildSuccessCount > 0) {
		console.log(chalk.bold(chalk.green(`\u2714\ufe0e Build successful.`)));
		return true;
	} else {
		console.log(chalk.bold(chalk.red("\u2717\ufe0e No components found.")));
		return false;
	}
}

async function build(args: string[]): Promise<void> {
	buildComponents(args);
}

async function publish(_: string[]) {
	console.log("Publishing...")
	await sleep(1000)
	console.log(chalk.green("Publish successful."))
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
		console.log(chalk.bold("Available commands:"));
		commands.forEach(command => {
			console.log(`  ${chalk.yellow(command.usage)} - ${command.help}`);
		});
		return;
	} else {
		const commandObj: Command | undefined = commands.find(cmd => cmd.cmd == command);
		if (!commandObj) {
			console.log(chalk.red(`Unknown command "${commandObj}". Supported commands are ${commands.map(cmd => cmd.cmd).join(", ")}. Run ${chalk.yellow("nav-sdk help")} for more information.`));
			return;
		} else if (help) {
			console.log(commandObj.help + "\n\nUsage: " + chalk.yellow(commandObj.usage));
			return;
		} else {
			await commandObj.run(args);
		}
	}
})();
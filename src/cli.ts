#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { build } from "esbuild";
import { parse as reactDocParse } from "react-docgen";
import fg from "fast-glob";
import chalk from "chalk";
import { execSync } from "child_process";

const NAVSDK_CONFIG_FILE_NAME = "navsdk.config.json";

type Config = {
	paths: string[];
	outputDir: string;
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
	if (!fs.existsSync(configPath)) {
		let newConfig = makeNewConfig();
		fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
		return newConfig;
	}
	const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
	return config;
}

async function buildComponent(componentPath: string, config: Config): Promise<boolean> {
	const componentName = path.basename(componentPath, path.extname(componentPath));
	const componentOutFile = path.join(config.outputDir, `${componentName}.js`);
	const reactdocOutFile = path.join(config.outputDir, `${componentName}.doc.json`);

	try {
		await build({
			entryPoints: [componentPath],
			bundle: true,
			minify: true,
			outfile: componentOutFile,
			jsx: "automatic",
			format: "esm",
			platform: "browser",
			external: ["react", "react-dom"],
		});


		const componentCode = fs.readFileSync(componentPath, "utf-8");
		const metadataArray = reactDocParse(componentCode);
		const metadata = metadataArray[0];

		if (!metadata || !metadata.props) {
			console.log(chalk.red("\u2717\ufe0e No props found for the component " + componentPath));
			return false;
		}

		fs.writeFileSync(reactdocOutFile, JSON.stringify(metadata, null, 2));

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

async function login() {
	console.log("Logging in...")
	await sleep(1000)
	console.log(chalk.green("Login successful."));
}

async function buildComponents(): Promise<boolean> {
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

async function publish() {
	console.log("Publishing...")
	await sleep(1000)
	console.log(chalk.green("Publish successful."))
}

const args = process.argv.slice(2);
const command = args[0] || "";
const help = args[1] == "-h" || args[1] == "--help";

(async () => {
	helloWorld();
	switch (command) {
		case "":
			break;
		case "help":
			console.log("Available commands are `login`, `build`, `publish`.");
			break;
		case "login":
			if (help) {
				console.log("Login to Nav editor.\n\nUsage: nav-sdk login");
			} else {
				await login();
			}
			break;
		case "build":
			if (help) {
				console.log("Build your custom components. \n\nUsage: nav-sdk build");
			} else {
				await buildComponents();
			}
			break;
		case "publish":
			if (help) {
				console.log("Publishes your built custom component. Requires you to be logged into the Nav editor.\n\nUsage: nav-sdk publish");
			} else {
				await login();
				await buildComponents();
				await publish();
			}
			break;
		default:
			console.log(chalk.red("Unknown command \"" + command + "\". Supported commands are `login`, `build`, `publish`."));
	}
})();
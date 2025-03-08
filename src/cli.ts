#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { build } from "esbuild";
import { parse as reactDocParse } from "react-docgen";
import fg from "fast-glob";

const NAVSDK_CONFIG_FILE_NAME = "navsdk.config.json";

type Config = {
	paths: string[];
	outputDir: string;
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

async function buildComponent(componentPath: string, config: Config) {
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
			console.log("\x1b[31m", "\u2717\ufe0e No props found for the component " + componentPath);
			return;
		}

		fs.writeFileSync(reactdocOutFile, JSON.stringify(metadata, null, 2));

		console.log("\x1b[32m", `\u2714\ufe0e Built ${componentOutFile}`);
	} catch (error) {
		console.log("\x1b[31m", `\u2717\ufe0e Failed to build ${componentPath} - ${error}`);
	}
}

async function buildComponents() {
	const config = await getConfig();
	if (!config) {
		console.log("\x1b[31m", "\u2717\ufe0e navsdk.config.json not found. Please create a config file to build your components.");
		return;
	}

	let files: string[] = await fg(config.paths);

	for (const file of files) {
		await buildComponent(file, config);
	}
}

const args = process.argv.slice(2);
const command = args[0];
const help = args[1] == "-h" || args[1] == "--help";

(async () => {
	switch (command) {
		case "build":
			if (help) {
				console.log("Build a custom component to Nav editor.\n\nUsage: nav-sdk build");
			} else {
				await buildComponents();
			}
			break;
		default:
			console.log("Unknown command. Supported commands is `build`.");
	}
})();
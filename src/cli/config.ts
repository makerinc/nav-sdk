
import chalk from "chalk";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";

export type Config = {
	paths: string[];
	outputDir: string;
}

const NAVSDK_CONFIG_FILE_NAME = "navsdk.config.json";

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

export async function makeConfig(): Promise<Config> {
	const configPath = path.join(process.cwd(), NAVSDK_CONFIG_FILE_NAME);
	let config = makeNewConfig();
	writeFileSync(configPath, JSON.stringify(config, null, 2));
	return config;
}

export async function getConfig(makeIfNotExists: boolean = true): Promise<Config | undefined> {
	const configPath = path.join(process.cwd(), NAVSDK_CONFIG_FILE_NAME);
	if (!existsSync(configPath)) {
		if (makeIfNotExists) {
			makeConfig();
		} else {
			return;
		}
	}
	const config = JSON.parse(readFileSync(configPath, "utf-8"));
	return config;
}

export function getVersion() {
	try {
		const output = execSync(`npm list -g @makerinc/nav-sdk --depth=0 --json`, { encoding: "utf-8" });
		const parsed = JSON.parse(output);
		return parsed.dependencies?.["@makerinc/nav-sdk"]?.version || chalk.red("No version detected");
	} catch (error) {
		return chalk.red("No version detected");
	}
}
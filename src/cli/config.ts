
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { Config } from "../types/cli";

const NAVSDK_CONFIG_FILE_NAME = "navsdk.config.json";

const EMPTY_CONFIG: Config = {
	paths: [
		"src/components/**/*.tsx",
		"src/components/**/*.ts",
		"src/components/**/*.jsx",
		"src/components/**/*.js",
	],
	outputDir: "node_modules/.nav-sdk"
}


export async function makeConfig(): Promise<Config> {
	const configPath = path.join(process.cwd(), NAVSDK_CONFIG_FILE_NAME);
	writeFileSync(configPath, JSON.stringify(EMPTY_CONFIG, null, 2));
	return EMPTY_CONFIG;
}

function fixConfig(config: Config): Config {
	return Object.assign({}, EMPTY_CONFIG, config);
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
	return fixConfig(config);
}

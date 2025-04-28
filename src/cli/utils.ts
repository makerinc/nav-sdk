
import chalk from "chalk";
import { execSync } from "child_process";


export function getVersion() {
	try {
		const output = execSync(`npm list -g @makerinc/nav-sdk --depth=0 --json`, { encoding: "utf-8" });
		const parsed = JSON.parse(output);
		return parsed.dependencies?.["@makerinc/nav-sdk"]?.version || chalk.red("No version detected");
	} catch (error) {
		return chalk.red("No version detected");
	}
}
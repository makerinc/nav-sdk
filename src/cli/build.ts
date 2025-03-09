
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import esbuild from "esbuild";
import { parse as reactDocParse } from "react-docgen";
import fg from "fast-glob";
import chalk from "chalk";
import { getConfig, Config } from "./config.js";

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

export async function build(args: string[]): Promise<void> {
	buildComponents(args);
}
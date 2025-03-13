
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import esbuild from "esbuild";
import { parse as reactDocParse } from "react-docgen";
import fg from "fast-glob";
import chalk from "chalk";
import { getConfig } from "./config.js";
import { Config, BuildInfo, ComponentPath } from "../types/cli";

const NAVSDK_BUILDINFO_FILE_NAME = "navsdk.buildinfo.json";

async function buildComponent(componentPath: string, config: Config): Promise<ComponentPath | undefined> {
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
			return;
		}

		writeFileSync(reactdocOutFile, JSON.stringify(metadata, null, 2));

		console.log(chalk.green("\u2714\ufe0e Built " + componentOutFile));
		return {
			jsPath: componentOutFile,
			docPath: reactdocOutFile
		};
	} catch (error) {
		console.log(chalk.red(`\u2717\ufe0e Failed to build ${componentPath} - ${error}`));
		return;
	}
}

function getBuildInfo(config: Config): BuildInfo {
	const buildInfoPath = path.join(config.outputDir, NAVSDK_BUILDINFO_FILE_NAME);
	if (existsSync(buildInfoPath)) {
		const buildInfo = JSON.parse(readFileSync(buildInfoPath, "utf-8"));
		return buildInfo;
	} else {
		return {};
	}
}

function saveBuildInfo(buildInfo: BuildInfo, config: Config) {
	const buildInfoPath = path.join(config.outputDir, NAVSDK_BUILDINFO_FILE_NAME);
	writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
}

export async function build(_: string[]): Promise<void> {
	const config = await getConfig();
	if (!config) {
		console.log(chalk.red("\u2717\ufe0e navsdk.config.json not found. Please create a config file to build your components."));
		return;
	}

	const buildInfo: BuildInfo = getBuildInfo(config);

	let files: string[] = await fg(config.paths);


	let buildSuccessCount = 0;
	let buildFailureCount = 0;

	await Promise.all(files.map(async (file) => {
		const componentPath = await buildComponent(file, config);
		if (componentPath) {
			buildInfo[componentPath.jsPath] = componentPath
			buildSuccessCount++;
		} else {
			buildFailureCount++;
		}
	}));

	saveBuildInfo(buildInfo, config);

	if (buildFailureCount > 0) {
		console.log(chalk.bold(chalk.red(`\u2717\ufe0e ${buildFailureCount} component${buildFailureCount > 1 ? "s" : ""} failed to build.`)));
	} else if (buildSuccessCount > 0) {
		console.log(chalk.bold(chalk.green(`\u2714\ufe0e Build successful.`)));
	} else {
		console.log(chalk.bold(chalk.red("\u2717\ufe0e No components found.")));
	}
	return;
}

export type Config = {
	paths: string[];
	outputDir: string;
}

export type ComponentPath = {
	jsPath: string;
	docPath: string;
}

export type BuildInfo = Record<string, ComponentPath>;

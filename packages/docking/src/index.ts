#!/usr/bin/env node
import { build, watch } from "./tasks";
import { Storage } from "./storage";
import cac from "cac";
import { loadConfig } from "./config";

const cli = cac("Docking");
const storage = new Storage();

cli.command("build", "Build the website for production").action(async () => {
	const config = await loadConfig();

	await build(storage, config);
});
cli.command("watch", "Start the development server").action(async () => {
	const config = await loadConfig();

	await build(storage, config, false);
	watch(storage, config);
});
cli.help();
cli.parse();

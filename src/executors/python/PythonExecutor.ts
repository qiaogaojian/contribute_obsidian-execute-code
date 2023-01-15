import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {Outputter} from "src/Outputter";
import {ExecutorSettings} from "src/settings/Settings";
import AsyncExecutor from "../AsyncExecutor";
import ReplExecutor from "../ReplExecutor.js";
import wrapPython, {PLT_DEFAULT_BACKEND_PY_VAR} from "./wrapPython";

export default class PythonExecutor extends ReplExecutor {
	removePrompts(output: string, source: "stdout" | "stderr"): string {
		if(source == "stderr") {
			return output.replace(/(^((\.\.\.|>>>) )+)|(((\.\.\.|>>>) )+$)/g, "");
		} else {
			return output;
		}
	}
	wrapCode(code: string, finishSigil: string): string {
		return wrapPython(code, this.globalsDictionaryName, this.printFunctionName, 
			finishSigil, this.settings.pythonEmbedPlots);
	}

	

	process: ChildProcessWithoutNullStreams

	printFunctionName: string;
	globalsDictionaryName: string;

	constructor(settings: ExecutorSettings, file: string) {

		const args = settings.pythonArgs ? settings.pythonArgs.split(" ") : [];

		args.unshift("-i");
		
		super(settings, settings.pythonPath, args,
			file, "python");
			
		this.printFunctionName = `__print_${Math.random().toString().substring(2)}_${Date.now()}`;
		this.globalsDictionaryName = `__globals_${Math.random().toString().substring(2)}_${Date.now()}`;
	}


	/**
	 * Swallows and does not output the "Welcome to Python v..." message that shows at startup.
	 * Also sets the printFunctionName up correctly and sets up matplotlib
	 */
	async setup() {
		this.addJobToQueue((resolve, reject) => {
			this.process.stdin.write(
/*python*/`
${this.globalsDictionaryName} = {**globals()}
${this.settings.pythonEmbedPlots ?
/*python*/`
try:
    import matplotlib
    ${PLT_DEFAULT_BACKEND_PY_VAR} = matplotlib.get_backend()
except:
    pass
` : "" }

from __future__ import print_function
import sys
${this.printFunctionName} = print
`.replace(/\r\n/g, "\n"));

			this.process.stderr.once("data", (data) => {
				resolve();
			});
		}).then(() => { /* do nothing */ });
	}
}

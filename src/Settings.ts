import {supportedLanguages} from "./main";


export type ExecutorSettingsLanguages = Exclude<typeof supportedLanguages[number], "javascript">;


/**
 * Interface that contains all the settings for the extension.
 */
export interface ExecutorSettings {
	timeout: number;
	nodePath: string;
	nodeArgs: string;
	jsInject: string;
	tsPath: string;
	tsArgs: string;
	tsInject: string;
	luaPath: string;
	luaArgs: string;
	luaInject: string;
	csPath: string;
	csArgs: string;
	csInject: string;
	pythonPath: string;
	pythonArgs: string;
	pythonEmbedPlots: boolean;
	pythonInject: string;
	shellPath: string;
	shellArgs: string;
	shellFileExtension: string;
	shellInject: string;
	groovyPath: string;
	groovyArgs: string;
	groovyFileExtension: string;
	groovyInject: string;
	golangPath: string,
	golangArgs: string,
	golangFileExtension: string,
	goInject: string;
	javaPath: string,
	javaArgs: string,
	javaFileExtension: string,
	javaInject: string;
	maxPrologAnswers: number;
	prologInject: string;
	powershellPath: string;
	powershellArgs: string;
	powershellFileExtension: string;
	powershellInject: string;
	cargoPath: string;
	cargoArgs: string;
	rustInject: string;
	cppRunner: string;
	cppInject: string;
	clingPath: string;
	clingArgs: string;
	clingStd: string;
	rustFileExtension: string,
	RPath: string;
	RArgs: string;
	REmbedPlots: boolean;
	rInject: string;
	kotlinPath: string;
	kotlinArgs: string;
	kotlinFileExtension: string;
	kotlinInject: string;
}


/**
 * The default settings for the extensions as implementation of the ExecutorSettings interface.
 */
export const DEFAULT_SETTINGS: ExecutorSettings = {
	timeout: 10000,
	nodePath: "node",
	nodeArgs: "",
	jsInject: "",
	tsPath: "ts-node",
	tsArgs: "",
	tsInject: "",
	luaPath: "lua",
	luaArgs: "",
	luaInject: "",
	csPath: "dotnet-script",
	csArgs: "",
	csInject: "",
	pythonPath: "python",
	pythonArgs: "",
	pythonEmbedPlots: true,
	pythonInject: "",
	shellPath: "bash",
	shellArgs: "",
	shellFileExtension: "sh",
	shellInject: "",
	groovyPath: "groovy",
	groovyArgs: "",
	groovyFileExtension: "groovy",
	groovyInject: "",
	golangPath: "go",
	golangArgs: "run",
	golangFileExtension: "go",
	goInject: "",
	javaPath: "java",
	javaArgs: "-ea",
	javaFileExtension: "java",
	javaInject: "",
	maxPrologAnswers: 15,
	prologInject: "",
	powershellPath: "powershell",
	powershellArgs: "-file",
	powershellFileExtension: "ps1",
	powershellInject: "",
	cargoPath: "cargo",
	cargoArgs: "run",
	rustInject: "",
	cppRunner: "cling",
	cppInject: "",
	clingPath: "cling",
	clingArgs: "",
	clingStd: "c++17",
	rustFileExtension: "rs",
	RPath: "Rscript",
	RArgs: "",
	REmbedPlots: true,
	rInject: "",
	kotlinPath: "kotlinc",
	kotlinArgs: "-script",
	kotlinFileExtension: "kts",
	kotlinInject: "",
}

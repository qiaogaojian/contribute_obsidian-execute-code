import {insertColorTheme, insertNotePath, insertNoteTitle, insertVaultPath} from "./Magic";
import {getVaultVariables} from "src/Vault";
import {canonicalLanguages} from 'src/main';
import type {App} from "obsidian";
import type {LanguageId} from "src/main";

/**
 * Transform a language name, to enable working with multiple language aliases, for example "js" and "javascript".
 *
 * @param language A language name or shortcut (e.g. 'js', 'python' or 'shell').
 * @returns The same language shortcut for every alias of the language.
 */
export function getLanguageAlias(language: string | undefined): LanguageId | undefined {
	if (language === undefined) return undefined;
	switch(language) {
		case "javascript": return "js";
		case "typescript": return "ts";
		case "csharp": return "cs";
		case "bash": return "shell";
		case "py": return "python";
		case "wolfram": return "mathematica";
		case "nb": return "mathematica";
		case "wl": "mathematica";
		case "hs": return "haskell";
	}
	if ((canonicalLanguages as readonly string[]).includes(language))
		return language as LanguageId;
	return undefined;
}

/**
 * Perform magic on source code (parse the magic commands) to insert note path, title, vault path, etc.
 *
 * @param app The current app handle (this.app from ExecuteCodePlugin).
 * @param srcCode Code with magic commands.
 * @returns The input code with magic commands replaced.
 */
export function transformMagicCommands(app: App, srcCode: string) {
	let ret = srcCode;
	const vars = getVaultVariables(app);
	if (vars) {
		ret = insertVaultPath(ret, vars.vaultPath);
		ret = insertNotePath(ret, vars.filePath);
		ret = insertNoteTitle(ret, vars.fileName);
		ret = insertColorTheme(ret, vars.theme);
	} else {
		console.warn(`Could not load all Vault variables! ${vars}`)
	}
	return ret;
}

/**
 * Extract the language from the first line of a code block.
 *
 * @param firstLineOfCode The first line of a code block that contains the language name.
 * @returns The language of the code block.
 */
export function getCodeBlockLanguage(firstLineOfCode: string) {
	return getLanguageAlias(firstLineOfCode.split("```")[1].trim().split(" ")[0].split("{")[0])
}

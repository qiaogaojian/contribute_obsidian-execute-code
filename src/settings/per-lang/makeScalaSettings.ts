import { Setting } from "obsidian";
import { SettingsTab } from "../SettingsTab";

export default (tab: SettingsTab, containerEl: HTMLElement) => {
    containerEl.createEl('h3', { text: 'Scala Settings' });
    new Setting(containerEl)
        .setName('scala path')
        .setDesc("Path to your scala installation")
        .addText(text => text
            .setValue(tab.plugin.settings.tsPath)
            .onChange(async (value) => {
                const sanitized = tab.sanitizePath(value);
                tab.plugin.settings.tsPath = sanitized;
                console.log('scala path set to: ' + sanitized);
                await tab.plugin.saveSettings();
            }));
    new Setting(containerEl)
        .setName('Scala arguments')
        .addText(text => text
            .setValue(tab.plugin.settings.tsArgs)
            .onChange(async (value) => {
                tab.plugin.settings.tsArgs = value;
                console.log('Scala args set to: ' + value);
                await tab.plugin.saveSettings();
            }));
    tab.makeInjectSetting(containerEl, "scala");
}
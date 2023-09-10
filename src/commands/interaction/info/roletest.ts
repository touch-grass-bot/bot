import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

export class RoletestCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'roletest';
        this.description = 'testrolepinging';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setNSFW(this.nsfw);
    }

    async execute(interaction: CommandInteraction) {
        await interaction.reply({ content: '<@&1056061278445109348> Test' });
    }
}

export default new RoletestCommand();
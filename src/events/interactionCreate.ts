import createDatabaseDocument = require('../modules/createDatabaseDocument');
import profileSchema = require('../schemas/profileSchema');
import guildSchema = require('../schemas/guildSchema');
import { Client, Interaction } from 'discord.js';
import { GuildDocument, ProfileDocument } from '../declarations';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: Interaction) {
        try {
            const client: Client = interaction.client;
            if (interaction.isCommand()) {
                const command: any = client.commands.get(interaction.commandName); // Get the command from the client's commands collection

                if (!command) return; // If the command is not found, return

                const profileData: ProfileDocument = await profileSchema.findOneAndUpdate({ userID: interaction.user.id }, { userID: interaction.user.id }, { upsert: true, new: true }); // Get the profile data from the database
                let guildData: GuildDocument | undefined = undefined;
                if (interaction.guild?.available) guildData = await guildSchema.findOneAndUpdate({ guildID: interaction.guild.id }, { guildID: interaction.guild.id }, { upsert: true, new: true }); // Get the guild data from the database

                try {
                    await command.execute({ client, interaction, profileData, guildData }); // Execute the command
                }
                catch (error) {
                    console.error(error); // If there is an error, log it
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};
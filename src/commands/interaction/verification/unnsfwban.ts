import profileSchema from '../../../schemas/profileSchema';
import { GuildMember } from 'discord.js';
import { checkServerMod } from '../../../modules/checkPerms';

module.exports = {
    name: 'unnsfwban',
    description: 'Remove the NSFW ban status from a user in the database.',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data', ephemeral: true });

        const member: GuildMember = interaction.options.getMember('member') as GuildMember;
        if (!member) return interaction.reply({ content: 'You need to mention a user', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'You need to be a trusted user to use this command', ephemeral: true });
        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        if (interaction.guild.roles.cache.has(guildData.roles?.nsfwBanRole)) await member.roles.remove(guildData.roles?.nsfwBanRole);

        await profileSchema.findOneAndUpdate({
            userID: member.id,
        }, {
            nsfw: {
                nsfwBanned: false,
            },
        }, {
            upsert: true,
        });

        await interaction.reply({ content: `Removed the NSFW ban status from ${member.user.tag}`, ephemeral: true });
    },
};
import guildSchema from '../schemas/guildSchema';
import profileSchema from '../schemas/profileRoleSchema';

export async function createGuildDocument(guildID: string): Promise<GuildDocument> {
    // Find or create a guild document by guild ID
    const guild: GuildDocument = await guildSchema.findOneAndUpdate(
        { guildID: guildID },
        {},
        { upsert: true, new: true }
    );
    return guild;
}

export async function createProfileDocument(userID: string): Promise<ProfileDocument> {
    // Find or create a profile document by user ID
    const profile: ProfileDocument = await profileSchema.findOneAndUpdate(
        { userID: userID },
        {},
        { upsert: true, new: true }
    );
    return profile;
}


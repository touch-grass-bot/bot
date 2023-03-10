import { model, Schema } from 'mongoose';
export = model('guilds', new Schema({
    guildID: { type: Schema.Types.String, require: true, unique: true },
    stickyRoles: { type: Schema.Types.Boolean, default: false },
    trusted: { type: Schema.Types.Boolean, default: false },
    roles: {
        nsfwBanRole: { type: Schema.Types.String, default: null },
        nsfwRole: { type: Schema.Types.String, default: null },
        verifiedRole: { type: Schema.Types.String, default: null },
        modRoles: { type: [Schema.Types.String], default: [] },
        muteRole: { type: Schema.Types.String, default: null },
    },
    stats: {
        nsfwBanCount: { type: Schema.Types.Number, default: 0 },
        verifyCount: { type: Schema.Types.Number, default: 0 },
    },
    channels : {
        nsfwBanLogChannelID: { type: Schema.Types.String, default: null },
        verificationLogChannelID: { type: Schema.Types.String, default: null },
        imageOnlyChannels: { type: [Schema.Types.String], default: [] },
        suggestionChannelID: { type: Schema.Types.String, default: null },
    },
    syncImports: { type: Schema.Types.Boolean, default: true },
    syncExports: { type: Schema.Types.Boolean, default: true },
    prefix: { type: Schema.Types.String, default: '!' },
}));
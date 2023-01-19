import { model, Schema } from 'mongoose';
export = model('stats', new Schema({
    userID: { type: Schema.Types.String, require: true, unique: true },
    guildID: { type: Schema.Types.String, require: true, unique: true },
    idCount: { type: Schema.Types.Number, default: 0 },
    verifyCount: { type: Schema.Types.Number, default: 0 },
}));
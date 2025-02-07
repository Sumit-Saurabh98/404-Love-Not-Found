import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  relationship: string;
  partner: string;
  language: string;
  mood: string;
  proposal: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    relationship: { type: String, required: true },
    partner: { type: String, required: true },
    language: { type: String, required: true },
    mood: { type: String, required: true },
    proposal: { type: String },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", userSchema);

export default User;
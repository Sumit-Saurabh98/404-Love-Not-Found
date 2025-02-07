import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  user: string;
  partner: string;
  _id?: mongoose.Types.ObjectId;
  language: string;
  mood: string;
  poem: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    user: { type: String, required: true },
    partner: { type: String, required: true },
    language: { type: String, required: true },
    mood: { type: String, required: true },
    poem: { type: String },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", userSchema);

export default User;
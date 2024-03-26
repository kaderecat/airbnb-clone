import { InferSchemaType, Schema, model } from "mongoose";

interface Document<T> {
  _doc: T;
}

interface UserI extends Document<UserI> {
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema<UserI>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

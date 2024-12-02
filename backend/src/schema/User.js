import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

// hashing
// pre "save": 저장되기 전에 수행
UserSchema.pre("save", async function () {
  if (this.password && (this.isNew || this.isModified("password")))
    this.password = await bcrypt.hash(this.password, 10);
});

// User schema 등록
const User = mongoose.model("User", UserSchema);

export default User;

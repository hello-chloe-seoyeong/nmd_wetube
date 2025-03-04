import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  socialOnly: { type: Boolean, default: false }
})

userSchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 5);
  // bcrypt.hash(somethingyouwanttohash, saltRounted): saltRounded 해쉬를 돌리는 횟수? / somethingyouwanttohash: 여기서는 this.password from userController, join페이지 form에서 사용자가 입력한 비밀번호
})

const User = mongoose.model("User", userSchema);
export default User;
import { response, Router } from "express";
import User from "../schema/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();

// 회원가입 구현
authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "회원가입 실패" });

  await User.create({ email, password }); // DB 저장

  return res.json({
    message: "회원가입 성공",
  });
});

// 로그인 구현
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "로그인 실패" });

  const foundUser = await User.findOne({ email });
  if (!foundUser)
    return res.status(404).json({ message: "유효하지 않은 이메일" });

  const comparePassword = await bcrypt.compare(password, foundUser.password);
  if (!comparePassword)
    return res.status(401).json({ message: "유효하지 않은 비밀번호" });

  // 토큰 기반 인증
  const payload = { _id: foundUser._id };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);

  return res
    .set({ Authorization: `Bearer ${token}` })
    .json({ accessToken: `Bearer ${token}` });
});
export default authRouter;

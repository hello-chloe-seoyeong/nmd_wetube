import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if(password !== password2) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: "Password confirmation does not matched."
    })
  }
  const exists = await User.exists({ $or: [{username}, {email}]})
  if(exists) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: "This username/email is already taken.."
    })
  }

  try {
    await User.create({
      name,
      email,
      password,
      username,
      location
    })
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).render("join", { pageTitle: "Upload Video", errorMessage: err._message})
  }
}
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login"});

export const postLogin = async (req, res) => {
  // check if account exists
  const { username, password } = req.body;
  // const user = await User.exists({ username }); // return true/false
  const user = await User.findOne({ username }); // return {...}
  // 계정이 존재하는지, 비밀번호가 맞는지 확인하려면 "누구"의 비밀번호인지 유저를 2번 찾네? 한번에 합쳐주기
  const pageTitle = "Login"; // 2번 겹치니까 변수로 써서 활용
  console.log(user)
  if(!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists."
    })
  }
  // check if password incorrect
  // const user = await User.findOne({ username });
  // console.log(user.password);

  const ok = await bcrypt.compare(password, user.password);
  if(!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password"
    })
  }
  // req.session: session object에 로그인 정보 추가
  req.session.loggedIn = true;
  req.session.user = user;
  console.log(req.session)
  return res.redirect("/");
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
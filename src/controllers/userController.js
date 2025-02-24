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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    })
  ).json();
  // res.send(JSON.stringify(json));
  if("access_token" in tokenRequest) {
    // access api
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`
        }
      })
    ).json();
    console.log(userRequest)
  } else {
    return res.redirect("/login")
  }
}

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
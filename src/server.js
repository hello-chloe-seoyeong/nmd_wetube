import express from "express"; // "express"라는 package를 express라는 이름으로 import 한거, 경로를 안적어줘도 npm과 nodeJS가 node_modules에 가서 express 찾아서 그 안에 있는 index.js를 실행시켜줘. 와우

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if(url === "/protected") { // 만일 url이 /protected이면 아래 실행, 아니면 next()
    return res.send("<h1>Not Allowed</h1>")
  }
  console.log("Allowed, you can continue.")
  next();
}

const handleHome = (req, res) => {
  return res.send("Home Page");
}

const handleProtected = (req, res) => {
  return res.send("Protected Page");
}

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome); // 누군가 "/" root page로 get request를 보내면, callback 함수를 실행시켜줘
// get request에는 route가 있어, 어디로 가고싶은지, /login, /about, / ... 이렇게
app.get("/protected", handleProtected);

const handleListening = () => console.log(`✅ Server listening on port http://localhost${PORT} 🚀`);

app.listen(PORT, handleListening); // 서버는 항상 request를 기다리고 있어야해. 언제 요청하나 듣고 있는거, app.listen(port, callback)
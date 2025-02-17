import express from "express"; // "express"라는 package를 express라는 이름으로 import 한거, 경로를 안적어줘도 npm과 nodeJS가 node_modules에 가서 express 찾아서 그 안에 있는 index.js를 실행시켜줘. 와우
import session from "express-session";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // 뷰 엔진으로 pug를 세팅, 이제 express는 html을 리턴할 때 pug를 이용할 거
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express applicationdl form의 value들을 이해할 수 있도록 하고 자바스크립트 형태로 바꿔줘.

app.use(session({
  secret: "Hello",
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions); // sessions: 백엔드가 기억하고 있는 sessions
    next();
  })
})

// test용, 세션 아이디 활용해서 오브젝트에 새로운것도 추가 가능.
app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id} ${req.session.potato}`);
})

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// server의 configuration에 관련 코드 처리 후 export

export default app;

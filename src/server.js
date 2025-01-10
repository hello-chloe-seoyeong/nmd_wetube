import express from "express"; // "express"라는 package를 express라는 이름으로 import 한거, 경로를 안적어줘도 npm과 nodeJS가 node_modules에 가서 express 찾아서 그 안에 있는 index.js를 실행시켜줘. 와우
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`✅ Server listening on port http://localhost${PORT} 🚀`);

app.listen(PORT, handleListening); // 서버는 항상 request를 기다리고 있어야해. 언제 요청하나 듣고 있는거, app.listen(port, callback)
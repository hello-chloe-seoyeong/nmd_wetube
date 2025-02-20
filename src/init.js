import "dotenv/config";
import "./db"; // 파일 자체를 import
import "./models/Video"; // 모두가 이 모델을 알 수 있게, db와 mongoose와 연결시켜서 video model 인식시키기
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // 서버는 항상 request를 기다리고 있어야해. 언제 요청하나 듣고 있는거, app.listen(port, callback)
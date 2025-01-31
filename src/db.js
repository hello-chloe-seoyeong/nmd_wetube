import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube")
// mongoose.connect("mongodb://127.0.0.1:27017/nameofyourdb") : 새로운 DB만들기 - url(terminal에서 mongosh쳐서 나오는 url)에 /새로운DB이름

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB")
const handleError = (error) => console.log("❌ DB Error", error)
// db.on("error", (error) => console.log("DB Error", error));
db.on("error", handleError)
db.once("open", handleOpen);
// on은 계속 발생시킬수 있는거, once는 한번만

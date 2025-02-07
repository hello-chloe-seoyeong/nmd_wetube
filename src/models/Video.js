// 해당 데이터가 어떻게 생겼는지(데이터 관점에서) 데이터베이스에 알려주기위해 몽구스를 도와주는 파일이랄까
import mongoose from "mongoose";

// 함수를 만들어서 사용해보자
// export const formatHashtags = (hashtags) => {
//   // console.log(hashtags)
//   hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
// }

// model을 만들기 전에 model의 형태를 정의를 해줘야해 : Schema
// Schema에는 실제 데이터가 들어가는게 아니라 어느 타입이 들어갈지만 미리 정의하는거
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, // == title: { type: String }
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true},
    rating: { type: Number, default: 0, required: true},
  }
})

// videoSchema.pre("save", async function() {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// })

videoSchema.static("formatHashtags", function(hashtags) {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})

const Video = mongoose.model("Video", videoSchema); // Model 만들기 ("모델의이름", 데이터형태Schema이름)
export default Video;
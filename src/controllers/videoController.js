import User from "../models/User";
import Video from "../models/Video";
// export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})

export const home = async (req, res) => {
  try {
    // const videos = await Video.find({});
    const videos = await Video.find({}).sort({ createdAt: "desc" }); // sorting ({기준: "acs/desc"})
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", error);
  }
};
export const watch = async (req, res) => {
  // const id = req.params.id; == same, 아래꺼가 ES6
  const { id } = req.params;
  // const video = await Video.findById(id);
  // const owner = await User.findById(video.owner);
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    res.status(404).render("404", { pageTitle: "Video not found" });
  }
  res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  // const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  // const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  // find video
  const video = await Video.exists({ _id: id });
  // 없으면 404로 보내고
  if (!video) {
    res.render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // update
  // video.title = title
  // video.description = description
  // video.hashtags = hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`))
  // await video.save()
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  // here we will add a video to the video array.
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body; // === title = req.body.title;
  try {
    const newVideo = await Video.create({
      title, // == title: title과 같은데, 앞에 있는 title은 videoSchema에 있는 title, 뒤에 있는 title은 req.body에서 온 title, 이름이 같다면 하나만 적어줘도 돼
      fileUrl,
      description,
      owner: _id,
      // createAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
      // meta: {
      //   views: 0,
      //   rating: 0
      // } models/Video.js videoSchema에 default 값 지정해둬서 필요없음
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/"); // home
  } catch (err) {
    console.log(err);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: err._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = []; //
  if (keyword) {
    // 조건 만든 이유? 검색 전 /search 페이지 가면 keyword 값이 없어서 undefined가 나와, 그러니 keyword값이 있을때만 검색관련 뭔가를 하려고 if statement
    // search
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
    // videos가 여기안에만 존재하면 밖에 videos가 undefined야, 그래서 let으로 빈 videos만들어고, keyword 존재 할때 넣어주기
  }
  return res.render("search", { pageTitle: "Search", videos });
};

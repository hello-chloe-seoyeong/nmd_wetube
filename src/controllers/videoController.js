import Video from "../models/Video";
// export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})

export const home = (req, res) => {
  Video.find({}, (error, videos) => {
    console.log("errors", error);
    console.log("videos", videos);
  });
  // {search terms} 인데, 빈 상태로 두면 "모든 형식"을 찾는다는 것을 의미
  return res.render("home", {pageTitle: "Home", videos: []});
  // home.pug에서 videos 배열 기다리고 있어서 임시로 보내주는 거
}
export const watch = (req, res) => {
  // const id = req.params.id; == same, 아래꺼가 ES6
  const { id } = req.params;
  res.render("watch", {pageTitle: `Watching`})
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", {pageTitle: `Editing`})
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
}
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "Upload Video"})
}

export const postUpload = (req, res) => {
  // here we will add a video to the video array.
  const {title} = req.body; // === title = req.body.title;

  videos.push(newVideo);
  return res.redirect("/")
}
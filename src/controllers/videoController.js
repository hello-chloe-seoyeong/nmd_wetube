import Video from "../models/Video";
// export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})

export const home = (req, res) => {
  Video.find({}, (error, videos) => { // callback function
    console.log("errors", error);
    console.log("videos", videos);
    return res.render("home", {pageTitle: "Home", videos: []});
  });
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
import Video from "../models/Video";
// export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
    return res.render("home", {pageTitle: "Home", videos});
  } catch(error) {
    return res.render("server-error", error)
  }
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
  const { title, description, hashtags } = req.body; // === title = req.body.title;
  const video = new Video({
    title, // == title: title과 같은데, 앞에 있는 title은 videoSchema에 있는 title, 뒤에 있는 title은 req.body에서 온 title, 이름이 같다면 하나만 적어줘도 돼
    description,
    createAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0
    }
  })
  return res.redirect("/") // home
}
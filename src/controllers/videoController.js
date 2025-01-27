const fakeUser = {
  username: "Chloe",
  loggedIn: true,
}

// const trending 안에 있던 걸 밖으로 빼서 trending, see, edit... 에서 다 쓸수 있게 되었어
const videos = [
  {
    title: "Video 1",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 1
  },
  {
    title: "Video 2",
    rating: 4,
    comments: 4,
    createAt: "5 minutes ago",
    views: 60,
    id: 2
  },
  {
    title: "Video 3",
    rating: 3,
    comments: 6,
    createAt: "8 minutes ago",
    views: 70,
    id: 3
  }
];

// export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})
export const trending = (req, res) => {
  return res.render("home", {pageTitle: "Home", videos})
}
export const see = (req, res) => {
  // const id = req.params.id; == same, 아래꺼가 ES6
  const { id } = req.params;
  const video = videos[id - 1]; // fake database id가 1부터 시작하는데, 인덱스는 0부터 시작해서 바꿔줍
  res.render("watch", {pageTitle: `Watching ${video.title}`})
};
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");


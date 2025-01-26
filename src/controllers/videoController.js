const fakeUser = {
  username: "Chloe",
  loggedIn: true,
}

// export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})
export const trending = (req, res) => {
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
  return res.render("home", {pageTitle: "Home", videos})
}
export const see = (req, res) => res.render("watch", {pageTitle: "Watch"});
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");


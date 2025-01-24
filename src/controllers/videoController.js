export const trending = (req, res) => res.render("home", {pageTitle: "Home"}); // render(view이름, {템플릿에 보낼 변수 원하는 만큼 보낼 수 있어})
export const see = (req, res) => res.render("watch", {pageTitle: "Watch"});
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");


# Wetube

**Global Router**
/ -> Home
/join -> Join
/login -> Login
/search -> Search
: 사실 /users/login, /users/join, /videos/search 이런식으로 했어야 규칙상으로는 맞겠지만, 너무 명확?한 이런것들, 마케팅?적으로 예외 있을 수 있지

**User Router**
/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit User
/users/delete -> Delete User

**Video Routers**
~~/videos/watch~~ => /videos/:id -> See Video
~~/videos/edit~~ => /videos/:id/edit -> Edit Video
~~/videos/delete~~ => /videos/:id/delete -> Delete Video
/videos/upload -> Upload Video
~~/videos/comments -> Comments on a video~~
~~/videos/comments/delete -> Delete a comment of a video~~

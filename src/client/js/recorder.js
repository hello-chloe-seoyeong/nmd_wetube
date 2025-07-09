import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;
  // 다운로드 되는 동안 버튼 클릭 안되게

  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  await ffmpeg.writeFile(files.input, await fetchFile(videoFile));

  await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);

  await ffmpeg.exec([
    "-i",
    files.input, // 이 파일을 가지고
    "-ss", // 파일의 특정 타임으로 이동
    "00:00:01", // 01초로 이동
    "-frames:v", // 스크린샷
    "1", // 1장
    files.thumb, // 이 이름으로
  ]);

  const mp4File = await ffmpeg.readFile(files.output);
  const thumbFile = await ffmpeg.readFile(files.thumb);
  // 만들어진 파일만 읽을수 있어. readFile의 return값은 Unit8Array == unsigned interger == positive interger
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  // buffer로 binary data를 얻을 수 있어 => 이걸로 Blob파일로 만들(?)기

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  await ffmpeg.deleteFile(files.input);
  await ffmpeg.deleteFile(files.output);
  await ffmpeg.deleteFile(files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);
  // 메모리에서 삭제하기

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
  // 다운로드 다 되고나면 다시 정상적으로 동작하게
};

const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data); // videoFile: 영상이 녹화 됐을 때 만들어진 objectUrl, createObjectURL: 브라우저가(우리가) 파일에 접근할 수 있도록 제공한 마법의 url
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream;
  video.play();
};

init();

actionBtn.addEventListener("click", handleStart);

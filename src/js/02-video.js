import Player from "@vimeo/player";

import throttle from "lodash.throttle";

const iframeEl = document.querySelector("#vimeo-player");
const KEY_STORAGE = "videoplayer-current-time";
const vimeoPlayer = new Player(iframeEl);

vimeoPlayer.on("timeupdate", throttle(onCurrentTime, 1000));
function onCurrentTime(e) {
  localStorage.setItem(KEY_STORAGE, e.seconds);
}

const savedTime = localStorage.getItem(KEY_STORAGE);
vimeoPlayer.setCurrentTime(savedTime || 0);

vimeoPlayer.off("play", onCurrentTime);

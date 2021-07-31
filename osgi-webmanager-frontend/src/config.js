const l = window.location;
const wssurl =
  (l.protocol === "https:" ? "wss://" : "ws://") +
  l.hostname +
  (l.port !== 80 && l.port !== 443 ? ":" + l.port : "");

export const API_URL = process.env.REACT_APP_API_URL;

export const WS_URL = process.env.REACT_APP_WS_URL || wssurl + "/ws";

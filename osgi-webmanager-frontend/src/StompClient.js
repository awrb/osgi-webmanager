import { Stomp } from "@stomp/stompjs";
import { LOG_ADDED, EVENT_ADDED } from "./actions/actions";
import { store } from "./components/App";

const connectToStomp = () => {
  const client = Stomp.client("ws://localhost:61614/ws");

  const headers = {
    login: "karaf",
    password: "karaf",
  };

  client.heartbeat.outgoing = 20000;
  client.heartbeat.incoming = 0;

  const decoder = new TextDecoder();

  client.connect(headers, (d) => {
    client.subscribe("/topic/logs", (data) => {
      store.dispatch({
        type: LOG_ADDED,
        payload: JSON.parse(decoder.decode(data.binaryBody)),
      });
    });

    client.subscribe("/topic/events", (data) => {
      console.log(data);
      store.dispatch({
        type: EVENT_ADDED,
        payload: JSON.parse(decoder.decode(data.binaryBody)),
      });
    });
  });
};

export default connectToStomp;

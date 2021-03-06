import { Stomp } from "@stomp/stompjs";
import { LOG_ADDED, EVENT_ADDED, BUNDLE_CHANGED } from "./actions/actions";
import { store } from "./components/App";

import { WS_URL } from "./config";

const connectToStomp = () => {
  const client = Stomp.client(`ws://localhost${WS_URL}`);

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
      store.dispatch({
        type: EVENT_ADDED,
        payload: JSON.parse(decoder.decode(data.binaryBody)),
      });
    });

    client.subscribe("/topic/bundles", (data) => {
      store.dispatch({
        type: BUNDLE_CHANGED,
        payload: JSON.parse(decoder.decode(data.binaryBody)),
      });
    });
  });
};

export default connectToStomp;

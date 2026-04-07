import morgan from "morgan";
import { Writable } from "stream";
import * as appConfig from "../../package.json";

const isDev = appConfig.environment !== "production";

// Middleware that silently discards output
const silentStream = new Writable({
  write(_chunk, _encoding, callback) {
    callback();
  },
});

// In dev: show routes in console; In prod: no output
const morganMiddleware = isDev
  ? morgan("dev")
  : morgan("combined", { stream: silentStream });

export default morganMiddleware;

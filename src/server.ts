import { env } from "./config/env.config";
// import { initSocket } from "./sockets";
import { createServer } from "http";
import app from "./app";

const server = createServer(app);
// initSocket(server);

server.listen(env.PORT, () => console.log(`Server is listening on ${env.PORT} port`));

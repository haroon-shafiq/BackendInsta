import { env } from "./config/env.config";
import app from "./app";

const port = env.PORT;
app.listen(port, () => {
    console.log(`Server is listenig on ${port} port`)
})
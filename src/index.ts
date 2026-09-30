import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Server listening on http://localhost:${env.port}`);
  console.log(`API docs available at http://localhost:${env.port}/docs`);
});

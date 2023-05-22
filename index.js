import { httpServer } from "./src/http_server/index.js";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import { drawCircle } from "./src/circle.js";
import { drawRectangle } from "./src/rectangle.js";
import { drawSquare } from "./src/square.js";
import { takeScreenshot } from "./src/screenshot.js";

const HTTP_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  server: httpServer,
});

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", async (data) => {
    const dataParsed = data.toString();
    let answer = dataParsed;
    if (dataParsed.startsWith("mouse")) {
      if (dataParsed === "mouse_position") {
        const position = await mouse.getPosition();
        answer = `mouse_position ${position.x},${position.y}`;
      } else if (dataParsed.startsWith("mouse_up")) {
        const n = +dataParsed.split(" ")[1];
        await mouse.move(up(n));
      } else if (dataParsed.startsWith("mouse_down")) {
        const n = +dataParsed.split(" ")[1];
        await mouse.move(down(n));
      } else if (dataParsed.startsWith("mouse_right")) {
        const n = +dataParsed.split(" ")[1];
        await mouse.move(right(n));
      } else if (dataParsed.startsWith("mouse_left")) {
        const n = +dataParsed.split(" ")[1];
        await mouse.move(left(n));
      }
    } else if (dataParsed.startsWith("draw")) {
      const cmd = dataParsed.split("_")[1];
      if (cmd.startsWith("circle")) {
        const radius = cmd.split(" ")[1];
        drawCircle(+radius);
      } else if (cmd.startsWith("rectangle")) {
        const width = +cmd.split(" ")[1];
        const height = +cmd.split(" ")[2];
        await drawRectangle(width, height);
      } else if (cmd.startsWith("square")) {
        const side = +cmd.split(" ")[1];
        await drawSquare(side);
      }
    } else {
      answer = await takeScreenshot(dataParsed);
    }
    ws.send(answer);
  });
});

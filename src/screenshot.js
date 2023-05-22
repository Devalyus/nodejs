import { mouse, screen, Region } from "@nut-tree/nut-js";
import Jimp from "jimp";

export async function takeScreenshot(command) {
  const { x, y } = await mouse.getPosition();
  const image = await (
    await screen.grabRegion(new Region(x - 50, y - 50, 100, 100))
  ).toRGB();

  const jimp = new Jimp({
    data: image.data,
    width: image.width,
    height: image.height,
  });

  const base64buffer = await jimp.getBufferAsync(Jimp.MIME_PNG);
  const base64 = base64buffer.toString("base64");
  return `${command} ${base64}`;
}

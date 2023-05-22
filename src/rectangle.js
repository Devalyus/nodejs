import { mouse, Button, straightTo, Point } from "@nut-tree/nut-js";

export async function drawRectangle(w, h) {
  const { x, y } = await mouse.getPosition();
  console.log(typeof x, typeof y);
  await mouse.pressButton(Button.LEFT);
  await mouse.move(straightTo(new Point(x, y + h)));
  await mouse.move(straightTo(new Point(x + w, y + h)));
  await mouse.move(straightTo(new Point(x + w, y)));
  await mouse.move(straightTo(new Point(x, y)));
  await mouse.releaseButton(Button.LEFT);
}

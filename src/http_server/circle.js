import { mouse, Button, straightTo, Point } from "@nut-tree/nut-js";

export async function drawCircle(radius) {
  const { x, y } = await mouse.getPosition();
  await mouse.pressButton(Button.LEFT);
  for (let i = 0; i < 360; i++) {
    const rad = (i / 180) * Math.PI;
    const cx = radius * Math.cos(rad) + x - radius;
    const cy = radius * Math.sin(rad) + y;
    await mouse.move(straightTo(new Point(cx, cy)));
  }

  await mouse.releaseButton(Button.LEFT);
}

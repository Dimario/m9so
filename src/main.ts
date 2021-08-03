import "./style.css";
import * as PIXI from "pixi.js";
import Formulas from "../lib/Formulas";
import { IKeyboard } from "../interfaces/ikeyboard";
import { IMouse } from "../interfaces/imouse";
import Weapon from "../classes/Weapon";

/**
 * VARIABLES
 */
const game = document.querySelector(".game");
const width = window.innerWidth - 200;
const height = window.innerHeight - 200;
let mouse: IMouse = {
  position: {
    x: 0,
    y: 0,
  },
  press: false,
};
let keyboard: IKeyboard = {
  key: {},
};
const HUMAN_SPEED = 3;
const HUMAN_RADIUS = 32;

/**
 * DOM EVENTS
 */
window.addEventListener("mousemove", (event: MouseEvent) => {
  mouse.position.x = event.clientX;
  mouse.position.y = event.clientY;
});
window.addEventListener("keypress", (event: KeyboardEvent) => {
  keyboard.key[event.code] = true;
});
window.addEventListener("keyup", (event: KeyboardEvent) => {
  keyboard.key[event.code] = false;
});
window.addEventListener("mousedown", () => {
  mouse.press = true;
});
window.addEventListener("mouseup", () => {
  mouse.press = false;
});

/**
 * ЧТо делаем с выстрелом?
 */

/**
 * START APPLICATION
 */

PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? "WebGL" : "canvas");

let app = new PIXI.Application({ width: width, height: height });

game!.appendChild(app.view);

let circle: PIXI.Graphics = new PIXI.Graphics();
circle.beginFill(0x9966ff);
circle.drawCircle(0, 0, HUMAN_RADIUS);
circle.endFill();
circle.x = 64;
circle.y = 130;
app.stage.addChild(circle);

let circle2: PIXI.Graphics = new PIXI.Graphics();
circle2.beginFill(0x9966ff);
circle2.drawCircle(0, 0, HUMAN_RADIUS / 2);
circle2.endFill();
circle2.x = 0;
circle2.y = 0;
app.stage.addChild(circle2);

let pistol: Weapon = new Weapon(app, { distance: 200 });

const sqr = new PIXI.Graphics();
sqr.beginFill(0x1156ff);
sqr.drawRect(0, 0, 10, 10);
sqr.endFill();
app.stage.addChild(sqr);

app.ticker.add(() => {
  const playerDeg = Formulas.angleBTwoPoints(
    circle.x,
    circle.y,
    mouse.position.x,
    mouse.position.y
  );

  const playerPoint = Formulas.pointOfCircle(
    circle.x,
    circle.y,
    playerDeg,
    HUMAN_RADIUS
  );

  circle2.x = playerPoint.x;
  circle2.y = playerPoint.y;

  /**
   * Обрабатываем нажатия клавиш
   */
  if (keyboard.key.KeyS) {
    circle.y += HUMAN_SPEED;
  }
  if (keyboard.key.KeyW) {
    circle.y -= HUMAN_SPEED;
  }
  if (keyboard.key.KeyD) {
    circle.x += HUMAN_SPEED;
  }
  if (keyboard.key.KeyA) {
    circle.x -= HUMAN_SPEED;
  }

  sqr.x = circle.x - 5;
  sqr.y = circle.y - 5;

  /**
   * Выстрелы
   */

  if (mouse.press) {
    pistol.shot(circle.x, circle.y, playerDeg);
  }

  if (pistol.shotsSize) {
    pistol.handlerShot();
  }
});

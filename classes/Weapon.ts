import * as PIXI from "pixi.js";
import Formulas from "../lib/Formulas";

export interface IWeaponSettings {
  distance?: number;
  interval?: number;
  clip?: number;
}

interface IShot {
  shot: PIXI.Graphics;
  angle: number;
  distanceCovered: number;
  x: number;
  y: number;
}

const DEFAULT_DISTANCE = 3050;
const DEFAULT_INTERVAL = 300;
const DEFAULT_PATRON_WIDTH = 5;
const DEFAULT_PATRON_HEIGHT = 5;
const DEFAULT_PATRON_SPEED = 5;
const DEFAULT_CLIP = 10;

export default class Weapon {
  public distance: number;
  public interval: number;
  public clip: number;
  public app: PIXI.Application;
  shots: {
    [key: string]: IShot;
  } = {};
  private shotCount: number = 0;

  constructor(app: PIXI.Application, settings: IWeaponSettings) {
    this.app = app;
    this.distance = settings.distance ? settings.distance : DEFAULT_DISTANCE;
    this.interval = settings.interval ? settings.interval : DEFAULT_INTERVAL;
    this.clip = settings.clip ? settings.clip : DEFAULT_CLIP;
  }

  public shot(x: number, y: number, angle: number) {
    const shot = new PIXI.Graphics();
    shot.beginFill(0x9966ff);
    shot.drawRect(
      x - DEFAULT_PATRON_WIDTH / 2,
      y - DEFAULT_PATRON_HEIGHT / 2,
      DEFAULT_PATRON_WIDTH,
      DEFAULT_PATRON_HEIGHT
    );
    shot.endFill();
    this.app.stage.addChild(shot);

    this.shots[this.shotCount] = {
      shot: shot,
      angle: angle,
      distanceCovered: 0,
      x: x,
      y: y,
    };

    this.shotCount++;
  }

  get shotsSize(): number {
    return Object.keys(this.shots).length;
  }

  public handlerShot() {
    for (let shot in this.shots) {
      if (this.shots[shot].distanceCovered >= this.distance) {
        this.shots[shot].shot.clear();
        delete this.shots[shot];
        continue;
      }

      this.flight(this.shots[shot]);
    }
  }

  private flight(shot: IShot): void {
    shot.distanceCovered = shot.distanceCovered + DEFAULT_PATRON_SPEED;

    const position = Formulas.pointOfCircle(
      shot.x,
      shot.y,
      shot.angle,
      shot.distanceCovered
    );
    shot.shot.x = position.x - DEFAULT_PATRON_WIDTH / 2;
    shot.shot.y = position.y - DEFAULT_PATRON_HEIGHT / 2;
  }
}

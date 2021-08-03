export default class Formulas {
  constructor() {}

  /**
   * Возвращает угол между двумя точками
   * @param point1X
   * @param point1Y
   * @param point2X
   * @param point2Y
   * @return угол
   */
  static angleBTwoPoints(
    point1X: number,
    point1Y: number,
    point2X: number,
    point2Y: number
  ): number {
    let A = (Math.atan2(point1Y - point2Y, point1X - point2X) / Math.PI) * 180;
    // A = A < 0 ? A + 360 : A;

    return A;
  }

  /**
   * Возращает точку на окружности, в зависимости от угла
   * @param x
   * @param y
   * @param angle
   * @param radius
   */
  static pointOfCircle(
    x: number,
    y: number,
    angle: number,
    radius: number
  ): { x: number; y: number } {
    let radian = ((angle - 180) * Math.PI) / 180;

    return {
      x: radius * Math.cos(radian) + x,
      y: radius * Math.sin(radian) + y,
    };
  }
}

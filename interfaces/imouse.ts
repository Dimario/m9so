/**
 * @var press: логическая переменная для отображения нажатия левой кнопки мыши
 * @var position позиция мышки
 */
export interface IMouse {
  position: {
    x: number;
    y: number;
  };
  press: boolean;
}

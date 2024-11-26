export interface Point {
  x: number;
  y: number;
}

export interface Guideline {
  point: Point;
  lineCount: number;
  color: string;
}

export interface ImageSettings {
  width: number;
  height: number;
  backgroundColor: string;
}

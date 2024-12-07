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

export enum Control {
  ImageSettings = "ImageSettings",
  Guideline1 = "Guideline1",
  Guideline2 = "Guideline2",
  Guideline3 = "Guideline3",
}

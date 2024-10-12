import { useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}
const MAX_LENGTH = 10_000;
function Perspective() {
  const svgRef = useRef(null);
  const [point1, setPoint1] = useState({ x: -100, y: 100 });
  const [point2, setPoint2] = useState({ x: 500, y: 100 });
  const [point3, setPoint3] = useState({ x: 300, y: 350 });
  const [linesCount, setLinesCount] = useState(10);
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(600);

  const getBasicSecondPoint = (point: Point) => {
    const points = Array.from(new Array(linesCount), (x, i) => i).map(
      (line) => {
        const angle = line ? (line * Math.PI) / linesCount : 0;

        const opp = Math.tan(angle) * MAX_LENGTH;
        return {
          x: point.x + MAX_LENGTH,
          y: point.y + opp,
        };
      }
    );
    return points;
  };

  const getLines = (centerPoint: Point): { point1: Point; point2: Point }[] => {
    const lines = getBasicSecondPoint(centerPoint).map((secondPoint) => {
      const m =
        (secondPoint.y - centerPoint.y) / (secondPoint.x - centerPoint.x);
      const b = secondPoint.y - m * secondPoint.x;

      const points: Point[] = [];
      if (m !== 0) {
        points.push({
          y: 0,
          x: -b / m,
        });
        points.push({
          y: height,
          x: (height - b) / m,
        });
      }
      points.push({
        x: 0,
        y: b,
      });
      points.push({
        x: width,
        y: m * width + b,
      });

      const acceptedPoints = points.filter(
        (point) =>
          point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height
      );
      return {
        point1: acceptedPoints[0],
        point2: acceptedPoints[1],
      };
    });

    return lines.filter((points) => points.point2);
  };

  return (
    <div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ background: "white" }}
      >
        {getLines(point1).map((points) => {
          return (
            <line
              x1={points.point1.x}
              y1={points.point1.y}
              x2={points.point2.x}
              y2={points.point2.y}
              stroke="blue"
              strokeWidth={2}
            ></line>
          );
        })}
        {getLines(point2).map((points) => {
          return (
            <line
              x1={points.point1.x}
              y1={points.point1.y}
              x2={points.point2.x}
              y2={points.point2.y}
              stroke="red"
              strokeWidth={2}
            ></line>
          );
        })}
        {getLines(point3).map((points) => {
          return (
            <line
              x1={points.point1.x}
              y1={points.point1.y}
              x2={points.point2.x}
              y2={points.point2.y}
              stroke="purple"
              strokeWidth={2}
            ></line>
          );
        })}
        {/* {getBasicSecondPoint(point1).map((point) => {
          return (
            <line
              x1={point1.x}
              y1={point1.y}
              x2={point.x}
              y2={point.y}
              stroke="blue"
              strokeWidth="2"
            />
          );
        })} */}
        {/* {getSecondPoints(point1).map((point) => {
          return (
            <line
              x1={point1.x}
              y1={point1.y}
              x2={point.x}
              y2={point.y}
              stroke="blue"
              strokeWidth="2"
            />
          );
        })}
        {getSecondPoints(point2).map((point) => {
          return (
            <line
              x1={point2.x}
              y1={point2.y}
              x2={point.x}
              y2={point.y}
              stroke="orange"
              strokeWidth="2"
            />
          );
        })}
        {getSecondPoints(point3).map((point) => {
          return (
            <line
              x1={point3.x}
              y1={point3.y}
              x2={point.x}
              y2={point.y}
              stroke="purple"
              strokeWidth="2"
            />
          );
        })} */}
      </svg>
    </div>
  );
}

export default Perspective;

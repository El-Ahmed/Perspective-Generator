import { forwardRef, useImperativeHandle, useRef } from "react";
import { Guideline, Point } from "../models";

export type PerspectiveHandle = {
  exportSvg: () => void;
};

const MAX_LENGTH = 10_000;
const Perspective = forwardRef<
  PerspectiveHandle,
  {
    guideline1: Guideline;
    guideline2: Guideline;
    guideline3: Guideline;
    height: number;
    width: number;
  }
>(({ guideline1, guideline2, guideline3, height, width }, ref) => {
  const svgRef = useRef(null);

  const exportSvg = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "guidelines.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  useImperativeHandle(ref, () => ({
    exportSvg,
  }));

  const getStrokeWidth = () => {
    return Math.min(height / 500, width / 500);
  };
  const getBasicSecondPoint = (guideline: Guideline) => {
    const { lineCount, point } = guideline;
    const points = Array.from(new Array(lineCount), (_, i) => i).map((line) => {
      const angle = line ? (line * Math.PI) / lineCount : 0;

      const opp = Math.tan(angle) * MAX_LENGTH;
      return {
        x: point.x + MAX_LENGTH,
        y: point.y + opp,
      };
    });
    return points;
  };

  const getLines = (
    guideline: Guideline
  ): { point1: Point; point2: Point }[] => {
    const centerPoint = guideline.point;
    const lines = getBasicSecondPoint(guideline).map((secondPoint) => {
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
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
      >
        <rect x="0" y="0" width={width} height={height} fill="white" />
        {getLines(guideline1).map((points) => {
          return (
            <line
              x1={points.point1.x}
              y1={points.point1.y}
              x2={points.point2.x}
              y2={points.point2.y}
              stroke="blue"
              strokeWidth={getStrokeWidth()}
            ></line>
          );
        })}
        {getLines(guideline2).map((points) => {
          return (
            <line
              x1={points.point1.x}
              y1={points.point1.y}
              x2={points.point2.x}
              y2={points.point2.y}
              stroke="red"
              strokeWidth={getStrokeWidth()}
            ></line>
          );
        })}
        {getLines(guideline3).map((points) => {
          return (
            <line
              x1={points.point1.x}
              y1={points.point1.y}
              x2={points.point2.x}
              y2={points.point2.y}
              stroke="purple"
              strokeWidth={getStrokeWidth()}
            ></line>
          );
        })}
      </svg>
    </div>
  );
});
export default Perspective;

import {
  forwardRef,
  TouchEvent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Control, Guideline, Point } from "../models";

export type PerspectiveHandle = {
  exportSvg: () => void;
  exportPng: () => void;
};

const MAX_LENGTH = 10_000;
const Perspective = forwardRef<
  PerspectiveHandle,
  {
    guideline1: Guideline;
    setGuideline1: (value: Guideline) => void;
    guideline2: Guideline;
    setGuideline2: (value: Guideline) => void;
    guideline3: Guideline;
    setGuideline3: (value: Guideline) => void;
    height: number;
    width: number;
    backgroundColor: string;
    selectedControl: Control;
  }
>(
  (
    {
      guideline1,
      setGuideline1,
      guideline2,
      setGuideline2,
      guideline3,
      setGuideline3,
      height,
      width,
      backgroundColor,
      selectedControl,
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);

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

    const exportPng = () => {
      if (!svgRef.current) return;
      const svgElement = svgRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "guidelines.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      img.src = url;
    };

    useImperativeHandle(ref, () => ({
      exportSvg,
      exportPng,
    }));

    const getStrokeWidth = () => {
      return Math.min(height / 800, width / 800);
    };
    const getBasicSecondPoint = (guideline: Guideline) => {
      const { lineCount, point } = guideline;
      const points = Array.from(new Array(lineCount), (_, i) => i).map(
        (line) => {
          const angle = line ? (line * Math.PI) / lineCount : 0;

          const opp = Math.tan(angle) * MAX_LENGTH;
          return {
            x: point.x + MAX_LENGTH,
            y: point.y + opp,
          };
        }
      );
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
            point.x >= 0 &&
            point.x <= width &&
            point.y >= 0 &&
            point.y <= height
        );
        return {
          point1: acceptedPoints[0],
          point2: acceptedPoints[1],
        };
      });

      return lines.filter((points) => points.point2);
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: { clientX: number; clientY: number }) => {
      setIsDragging(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
    };
    const handleTouchStart = (touch: TouchEvent) => {
      const e = touch.touches[0];
      handleMouseDown(e);
    };
    const handleTouchMove = (touch: TouchEvent) => {
      const e = touch.touches[0];
      handleMouseMove(e);
    };

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      if (!isDragging) return;
      if (!svgRef.current) return;

      const newX = e.clientX;
      const newY = e.clientY;

      const dx = newX - startPosition.x,
        dy = newY - startPosition.y;

      setStartPosition({ x: e.clientX, y: e.clientY });

      const rect = svgRef.current.getBoundingClientRect();
      const adjustedDx = (dx * width) / rect.width,
        adjustedDy = (dy * height) / rect.height;

      switch (selectedControl) {
        case Control.Guideline1:
          setGuideline1({
            ...guideline1,
            point: {
              x: +(guideline1.point.x + adjustedDx).toFixed(2),
              y: +(guideline1.point.y + adjustedDy).toFixed(2),
            },
          });
          break;
        case Control.Guideline2:
          setGuideline2({
            ...guideline2,
            point: {
              x: +(guideline2.point.x + adjustedDx).toFixed(2),
              y: +(guideline2.point.y + adjustedDy).toFixed(2),
            },
          });
          break;
        case Control.Guideline3:
          setGuideline3({
            ...guideline3,
            point: {
              x: +(guideline3.point.x + adjustedDx).toFixed(2),
              y: +(guideline3.point.y + adjustedDy).toFixed(2),
            },
          });
          break;

        default:
          setGuideline1({
            ...guideline1,
            point: {
              x: +(guideline1.point.x + adjustedDx).toFixed(2),
              y: +(guideline1.point.y + adjustedDy).toFixed(2),
            },
          });
          setGuideline2({
            ...guideline2,
            point: {
              x: +(guideline2.point.x + adjustedDx).toFixed(2),
              y: +(guideline2.point.y + adjustedDy).toFixed(2),
            },
          });
          setGuideline3({
            ...guideline3,
            point: {
              x: +(guideline3.point.x + adjustedDx).toFixed(2),
              y: +(guideline3.point.y + adjustedDy).toFixed(2),
            },
          });
          break;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchCancel={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={backgroundColor}
          />
          {getLines(guideline1).map((points) => {
            return (
              <line
                x1={points.point1.x}
                y1={points.point1.y}
                x2={points.point2.x}
                y2={points.point2.y}
                stroke={guideline1.color}
                strokeWidth={
                  getStrokeWidth() *
                  (selectedControl === Control.Guideline1 ? 2 : 1)
                }
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
                stroke={guideline2.color}
                strokeWidth={
                  getStrokeWidth() *
                  (selectedControl === Control.Guideline2 ? 2 : 1)
                }
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
                stroke={guideline3.color}
                strokeWidth={
                  getStrokeWidth() *
                  (selectedControl === Control.Guideline3 ? 2 : 1)
                }
              ></line>
            );
          })}
        </svg>
      </div>
    );
  }
);
export default Perspective;

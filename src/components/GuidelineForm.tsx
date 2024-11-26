import { Guideline } from "../models";
import ColorInput from "./ColorInput";
import NumberInput from "./NumberInput";

type guidelineChange = (guideline: Guideline) => void;

const GuidelineForm = ({
  guideline,
  guidelineChange,
}: {
  guideline: Guideline;
  guidelineChange: guidelineChange;
}) => {
  const setX = (number: number) => {
    guidelineChange({
      ...guideline,
      point: {
        ...guideline.point,
        x: number,
      },
    });
  };
  const setY = (number: number) => {
    guidelineChange({
      ...guideline,
      point: {
        ...guideline.point,
        y: number,
      },
    });
  };
  const setLineCount = (number: number) => {
    guidelineChange({
      ...guideline,
      lineCount: number,
    });
  };
  const setColor = (color: string) => {
    guidelineChange({
      ...guideline,
      color: color,
    });
  };
  return (
    <div className="current-control">
      <div>
        <table rules="columns" className="input">
          <tr>
            <td>
              <label>X:</label>
              <NumberInput
                currentNumber={guideline.point.x}
                numberChanged={setX}
              />
            </td>
            <td>
              <label>Y:</label>
              <NumberInput
                currentNumber={guideline.point.y}
                numberChanged={setY}
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="input">
        <label>Lines count:</label>
        <NumberInput
          currentNumber={guideline.lineCount}
          numberChanged={setLineCount}
          disableNegative={true}
        />
      </div>
      <ColorInput currentColor={guideline.color} colorChanged={setColor} />
    </div>
  );
};

export default GuidelineForm;

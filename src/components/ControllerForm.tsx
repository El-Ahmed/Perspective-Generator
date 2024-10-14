import { Guideline } from "../models";
import ColorPicker from "./ColorPicker";

type guidelineChange = (guideline: Guideline) => void;

const ControllerForm = ({
  guideline,
  guidelineChange,
}: {
  guideline: Guideline;
  guidelineChange: guidelineChange;
}) => {
  return (
    <form>
      <label>Color: </label>
      <ColorPicker
        color={guideline.color}
        colorChanged={(color: string) =>
          guidelineChange({
            point: guideline.point,
            lineCount: guideline.lineCount,
            color: color,
          })
        }
      />
      <br />
      <label>X: </label>
      <input
        type="number"
        value={guideline.point.x}
        onChange={(e) =>
          guidelineChange({
            point: { x: Number(e.target.value), y: guideline.point.y },
            lineCount: guideline.lineCount,
            color: guideline.color,
          })
        }
      />
      <label>Y: </label>
      <input
        type="number"
        value={guideline.point.y}
        onChange={(e) =>
          guidelineChange({
            point: { y: Number(e.target.value), x: guideline.point.x },
            lineCount: guideline.lineCount,
            color: guideline.color,
          })
        }
      />
      <legend>Lines count: </legend>
      <input
        type="number"
        value={guideline.lineCount}
        onChange={(e) =>
          guidelineChange({
            point: guideline.point,
            lineCount: Number(e.target.value),
            color: guideline.color,
          })
        }
      />
    </form>
  );
};

export default ControllerForm;

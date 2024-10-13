import { Guideline } from "../models";

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
      <label>X: </label>
      <input
        type="number"
        value={guideline.point.x}
        onChange={(e) =>
          guidelineChange({
            point: { x: Number(e.target.value), y: guideline.point.y },
            lineCount: guideline.lineCount,
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
          })
        }
      />
    </form>
  );
};

export default ControllerForm;

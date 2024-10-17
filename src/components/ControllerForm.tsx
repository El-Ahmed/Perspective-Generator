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
    <table>
      <tr>
        <th>Color:</th>
        <th>
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
        </th>
      </tr>
      <tr>
        <th>X position:</th>
        <th>
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
        </th>
      </tr>
      <tr>
        <th>Y position:</th>
        <th>
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
        </th>
      </tr>
      <tr>
        <th>Lines count:</th>
        <th>
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
        </th>
      </tr>
    </table>
  );
};

export default ControllerForm;

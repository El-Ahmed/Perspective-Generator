import { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useDetectClickOutside } from "react-detect-click-outside";
function rgbaToString(
  red: number,
  green: number,
  blue: number,
  alpha?: number
) {
  if (alpha) return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  return `rgba(${red}, ${green}, ${blue})`;
}
const ColorPicker = ({
  color,
  colorChanged,
}: {
  color: string;
  colorChanged: (color: string) => void;
}) => {
  const [pickerVisibility, setPickerVisibility] = useState(false);
  const pickColor = (e: React.MouseEvent) => {
    e.preventDefault();
    setPickerVisibility(!pickerVisibility);
  };
  const hidePicker = (event: Event) => {
    if (event.target === buttonRef.current) return;
    setPickerVisibility(false);
  };
  const ref = useDetectClickOutside({
    onTriggered: hidePicker,
  });
  const buttonRef = useRef(null);

  return (
    <>
      <button
        ref={buttonRef}
        className="color"
        style={{ background: color }}
        onClick={(e) => pickColor(e)}
      ></button>
      <div
        className="color-picker"
        style={{ visibility: pickerVisibility ? "visible" : "hidden" }}
        ref={ref}
      >
        <SketchPicker
          color={color}
          onChange={(c) =>
            colorChanged(rgbaToString(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
          }
        />
      </div>
    </>
  );
};

export default ColorPicker;

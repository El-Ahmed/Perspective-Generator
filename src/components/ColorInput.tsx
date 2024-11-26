import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";

const ColorInput = ({
  currentColor,
  colorChanged,
}: {
  currentColor: string;
  colorChanged: (colorValue: string) => void;
}) => {
  // setting the init color
  useEffect(() => {
    inputSetColor(currentColor);
  }, [currentColor]);

  // set color except if it's wrong
  // don't allow color if it's not in the form #fff..
  // save colors as rgba and as hex whenever any change happens
  // convert both ways
  // send back the hex/hexa color
  const [inputColor, setInputColor] = useState<string | undefined>(undefined);
  const [rgbaColor, setRgbaColor] = useState<string>("");
  const inputSetColor = (currentColorString?: string) => {
    console.log("currentColorString", currentColorString);
    if (currentColorString === undefined) {
      setInputColor(undefined);
      return;
    }
    const stripedColor = currentColorString.trim();
    if (stripedColor === "") {
      setInputColor(undefined);
      return;
    }
    if (stripedColor[0] !== "#") return;

    const hexColor = stripedColor.substring(1).toLowerCase();

    const parsedHex = parseInt(hexColor, 16);
    if (hexColor.length && isNaN(parsedHex)) return;

    setInputColor(stripedColor);
    const rgba = hexToRGBA(hexColor);
    if (rgba) {
      setRgbaColor(rgba);
      colorChanged(stripedColor);
    }
  };
  const hexToRGBA = (hex: string) => {
    if (![3, 4, 6, 8].includes(hex.length)) return undefined;
    let modifiedHex = hex;

    if ([3, 4].includes(modifiedHex.length)) {
      modifiedHex = modifiedHex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    if (modifiedHex.length === 6) {
      modifiedHex += "ff";
    }
    const r = parseInt(modifiedHex.slice(0, 2), 16),
      g = parseInt(modifiedHex.slice(2, 4), 16),
      b = parseInt(modifiedHex.slice(4, 6), 16),
      a = parseInt(modifiedHex.slice(6, 8), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
  };

  const toHex = (number: number) => {
    const hexNumber = number.toString(16).toLowerCase();
    if (hexNumber.length === 1) return "0" + hexNumber;
    if (hexNumber.length > 2) return "ff";
    return hexNumber;
  };

  const pickerSetColor = (currentColorRgba: string) => {
    const trimmedString = currentColorRgba.trim();
    const splitString = trimmedString
      .substring(5, trimmedString.length - 1)
      .split(",");
    const r = Number(splitString[0].trim()),
      g = Number(splitString[1].trim()),
      b = Number(splitString[2].trim()),
      a = Number(splitString[3].trim());
    if (a === 1) {
      const hexString = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      inputSetColor(hexString);
      return;
    }

    const hexString = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(
      Math.round(a * 255)
    )}`;
    inputSetColor(hexString);
  };

  return (
    <div className="input">
      <label>Color:</label>
      <input
        value={inputColor}
        onChange={(e) => {
          inputSetColor(e.target.value);
        }}
      ></input>
      <ColorPicker
        color={rgbaColor}
        colorChanged={(color: string) => {
          pickerSetColor(color);
        }}
      />
    </div>
  );
};

export default ColorInput;

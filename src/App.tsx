import { useState } from "react";
import "./App.css";
import ControllerForm from "./components/ControllerForm";
import Perspective from "./components/Perspective";

function App() {
  const [guideline1, setGuideline1] = useState({
    point: { x: -100, y: 100 },
    lineCount: 10,
  });
  const [guideline2, setGuideline2] = useState({
    point: { x: 500, y: 100 },
    lineCount: 10,
  });
  const [guideline3, setGuideline3] = useState({
    point: { x: 300, y: 350 },
    lineCount: 10,
  });
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(600);
  return (
    <>
      <label>Width: </label>
      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
      />
      <label>Height: </label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
      <legend>Point 1</legend>
      <ControllerForm guideline={guideline1} guidelineChange={setGuideline1} />
      <legend>Point 2</legend>
      <ControllerForm guideline={guideline2} guidelineChange={setGuideline2} />
      <legend>Point 3</legend>
      <ControllerForm guideline={guideline3} guidelineChange={setGuideline3} />

      <Perspective
        guideline1={guideline1}
        guideline2={guideline2}
        guideline3={guideline3}
        height={height}
        width={width}
      />
    </>
  );
}

export default App;

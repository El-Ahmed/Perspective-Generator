import { useRef, useState } from "react";
import "./App.css";
import ControllerForm from "./components/ControllerForm";
import Perspective, { PerspectiveHandle } from "./components/Perspective";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  const [guideline1, setGuideline1] = useState({
    point: { x: 200, y: 400 },
    lineCount: 20,
    color: "#0000ff",
  });
  const [guideline2, setGuideline2] = useState({
    point: { x: 1720, y: 400 },
    lineCount: 20,
    color: "#ff0000",
  });
  const [guideline3, setGuideline3] = useState({
    point: { x: 960, y: -4000 },
    lineCount: 50,
    color: "#800080",
  });
  const [imageSettings, setImageSettings] = useState({
    height: 1080,
    width: 1920,
    backgroundColor: "#fff",
  });

  const perspectiveRef = useRef<PerspectiveHandle>(null);

  return (
    <PrimeReactProvider>
      <div className="container">
        <h1 className="krona-one-regular title">Perspective Generator</h1>
        <div className="cards-container">
          <div className="card perspective-card">
            <Perspective
              ref={perspectiveRef}
              guideline1={guideline1}
              guideline2={guideline2}
              guideline3={guideline3}
              backgroundColor={imageSettings.backgroundColor}
              height={imageSettings.height}
              width={imageSettings.width}
            />
          </div>
          <div className="secondary-cards">
            <div className="card controls">
              <ControllerForm
                imageSettings={imageSettings}
                setImageSettings={setImageSettings}
                guideline1={guideline1}
                setGuideline1={setGuideline1}
                guideline2={guideline2}
                setGuideline2={setGuideline2}
                guideline3={guideline3}
                setGuideline3={setGuideline3}
              />
            </div>
            <div
              className="card button krona-one-regular"
              onClick={() => perspectiveRef.current?.exportPng?.()}
            >
              <img className="buttonIcon" src="/png-svgrepo-com.svg"></img>
              <span>Download as PNG</span>
            </div>
            <div
              className="card button krona-one-regular"
              onClick={() => perspectiveRef.current?.exportSvg?.()}
            >
              <img className="buttonIcon" src="/svg-svgrepo-com.svg"></img>
              <span>Download as SVG</span>
            </div>
            <div
              className="card button krona-one-regular"
              onClick={() => window.open("https://ko-fi.com/elahmed", "_blank")}
            >
              <img className="buttonIcon" src="/kofi_symbol.svg"></img>
              <span>Support me on ko-fi</span>
            </div>
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;

import { Dropdown, DropdownProps } from "primereact/dropdown";
import { Control, Guideline, ImageSettings } from "../models";
import GuidelineForm from "./GuidelineForm";
import ImageSettingsForm from "./ImageSettingsForm";

const ControllerForm = ({
  imageSettings,
  setImageSettings,
  guideline1,
  setGuideline1,
  guideline2,
  setGuideline2,
  guideline3,
  setGuideline3,
  selectedControl,
  setSelectedControl,
}: {
  imageSettings: ImageSettings;
  setImageSettings: (value: ImageSettings) => void;
  guideline1: Guideline;
  setGuideline1: (value: Guideline) => void;
  guideline2: Guideline;
  setGuideline2: (value: Guideline) => void;
  guideline3: Guideline;
  setGuideline3: (value: Guideline) => void;
  selectedControl: Control;
  setSelectedControl: (value: Control) => void;
}) => {
  const getControl = (option: Control) => {
    const control = { name: "Control", color: "#fff" };
    switch (option) {
      case Control.ImageSettings:
        control.name = "Image settings";
        control.color = imageSettings.backgroundColor;
        break;
      case Control.Guideline1:
        control.name = "Guideline 1";
        control.color = guideline1.color;
        break;
      case Control.Guideline2:
        control.name = "Guideline 2";
        control.color = guideline2.color;
        break;
      case Control.Guideline3:
        control.name = "Guideline 3";
        control.color = guideline3.color;
        break;
    }
    return control;
  };
  const selectedControlTemplate = (option: Control, props: DropdownProps) => {
    if (option) {
      const control = getControl(option);
      return (
        <div className="selected-control">
          <span
            className="color-circle"
            style={{
              background: control.color,
            }}
          ></span>
          <span>{control.name}</span>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const controlOptionTemplate = (option: Control) => {
    const control = getControl(option);
    return (
      <div className="selected-control">
        <span
          className="color-circle"
          style={{
            background: control.color,
          }}
        ></span>
        <span>{control.name}</span>
      </div>
    );
  };
  return (
    <>
      <h2 className="krona-one-regular">Controls</h2>
      <Dropdown
        width={"100%"}
        value={selectedControl}
        onChange={(e) => setSelectedControl(e.value)}
        options={Object.values(Control)}
        optionLabel="name"
        placeholder="Control"
        valueTemplate={selectedControlTemplate}
        itemTemplate={controlOptionTemplate}
      />
      {(() => {
        switch (selectedControl) {
          case Control.ImageSettings:
            return (
              <ImageSettingsForm
                imageSettings={imageSettings}
                imageSettingsChange={setImageSettings}
              ></ImageSettingsForm>
            );
          case Control.Guideline1:
            return (
              <GuidelineForm
                guideline={guideline1}
                guidelineChange={setGuideline1}
              ></GuidelineForm>
            );
          case Control.Guideline2:
            return (
              <GuidelineForm
                guideline={guideline2}
                guidelineChange={setGuideline2}
              ></GuidelineForm>
            );
          case Control.Guideline3:
            return (
              <GuidelineForm
                guideline={guideline3}
                guidelineChange={setGuideline3}
              ></GuidelineForm>
            );
        }
      })()}
    </>
  );
};

export default ControllerForm;

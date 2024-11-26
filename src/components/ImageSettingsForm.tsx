import { ImageSettings } from "../models";
import ColorInput from "./ColorInput";
import NumberInput from "./NumberInput";

type imageSettingsChange = (imageSettings: ImageSettings) => void;

const ImageSettingsForm = ({
  imageSettings,
  imageSettingsChange,
}: {
  imageSettings: ImageSettings;
  imageSettingsChange: imageSettingsChange;
}) => {
  return (
    <div className="current-control">
      <div className="input">
        <label>Height:</label>
        <NumberInput
          currentNumber={imageSettings.height}
          numberChanged={(height) =>
            imageSettingsChange({ ...imageSettings, height })
          }
          disableNegative={true}
        />
      </div>
      <div className="input">
        <label>Width:</label>
        <NumberInput
          currentNumber={imageSettings.width}
          numberChanged={(width) =>
            imageSettingsChange({ ...imageSettings, width })
          }
          disableNegative={true}
        />
      </div>
      <ColorInput
        currentColor={imageSettings.backgroundColor}
        colorChanged={(backgroundColor) =>
          imageSettingsChange({ ...imageSettings, backgroundColor })
        }
      />
    </div>
  );
};

export default ImageSettingsForm;

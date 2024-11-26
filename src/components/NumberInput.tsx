import { useEffect, useState } from "react";

const NumberInput = ({
  currentNumber,
  numberChanged,
  disableNegative,
}: {
  currentNumber: number;
  numberChanged: (numberValue: number) => void;
  disableNegative?: boolean;
}) => {
  // setting the init numbers
  useEffect(() => {
    setNumber(currentNumber);
  }, [currentNumber]);

  // updating the number except if it's empty
  const [number, setNumber] = useState<number | undefined>(undefined);
  const inputSetNumber = (currentNumber?: string) => {
    if (currentNumber === undefined) {
      setNumber(undefined);
      return;
    }
    const stripedNumber = currentNumber.trim();
    if (stripedNumber === "") {
      setNumber(undefined);
      return;
    }

    const asNumber = Number(stripedNumber);
    if (isNaN(asNumber)) return;
    if (disableNegative && asNumber < 0) {
      return;
    }
    setNumber(asNumber);
    numberChanged(asNumber);
  };
  return (
    <input
      type="number"
      value={number}
      onChange={(e) => {
        inputSetNumber(e.target.value);
      }}
    ></input>
  );
};

export default NumberInput;

import { Dispatch, SetStateAction } from "react";
import { ChangeEventHandler, useRef } from "react";

export type PhoneInputState = string[];

const isValidNumberInput = (value: string) => /^\d*$/.test(value);

export const PhoneInput = ({
  phoneInputState,
  setPhoneInputState,
}: {
  phoneInputState: PhoneInputState;
  setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}) => {
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);

  const refs = [ref1, ref2, ref3, ref4];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;

      if (!isValidNumberInput(value)) {
        return;
      }

      const shouldGoToNextRef = currentMaxLength === value.length;
      const shouldGoToPrevRef = value.length === 0;

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef && nextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoToPrevRef && prevRef) {
        prevRef.current?.focus();
      }
      setPhoneInputState(newState);
    };

  return (
    <div className="input-wrap">
      <label htmlFor="">Phone: </label>
      <div id="phone-input-wrap">
        <input
          id="phone-input-1"
          type="text"
          style={{
            width: 40,
          }}
          value={phoneInputState[0]}
          onChange={createOnChangeHandler(0)}
          ref={ref1}
          maxLength={2}
          placeholder="55"
        />
        -
        <input
          id="phone-input-2"
          type="text"
          style={{
            width: 40,
          }}
          value={phoneInputState[1]}
          onChange={createOnChangeHandler(1)}
          ref={ref2}
          placeholder="55"
          maxLength={2}
        />
        -
        <input
          id="phone-input-3"
          type="text"
          style={{
            width: 40,
          }}
          value={phoneInputState[2]}
          onChange={createOnChangeHandler(2)}
          ref={ref3}
          placeholder="55"
          maxLength={2}
        />
        -
        <input
          id="phone-input-4"
          type="text"
          style={{
            width: 40,
          }}
          value={phoneInputState[3]}
          onChange={createOnChangeHandler(3)}
          ref={ref4}
          placeholder="5"
          maxLength={1}
        />
      </div>
    </div>
  );
};

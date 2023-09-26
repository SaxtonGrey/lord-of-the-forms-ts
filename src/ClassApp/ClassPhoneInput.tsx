import { ChangeEvent, Component, RefObject, createRef } from "react";

export type PhoneInputState = string[];

const isValidNumberInput = (value: string) => /^\d*$/.test(value);

class PhoneInput extends Component<{
  phoneInputState: PhoneInputState;
  setPhoneInputState: (phoneInputState: PhoneInputState) => void;
}> {
  ref1: RefObject<HTMLInputElement> = createRef();
  ref2: RefObject<HTMLInputElement> = createRef();
  ref3: RefObject<HTMLInputElement> = createRef();
  ref4: RefObject<HTMLInputElement> = createRef();

  inputRefs: RefObject<HTMLInputElement>[] = [
    this.ref1,
    this.ref2,
    this.ref3,
    this.ref4,
  ];

  createOnChangeHandler =
    (index: 0 | 1 | 2 | 3) => (e: ChangeEvent<HTMLInputElement>) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = this.inputRefs[index + 1];
      const prevRef = this.inputRefs[index - 1];
      const value = e.target.value;

      if (!isValidNumberInput(value)) {
        return;
      }

      const { phoneInputState, setPhoneInputState } = this.props;

      const shouldGoToNextRef = currentMaxLength === value.length;
      const shouldGoToPrevRef = value.length === 0;

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef && nextRef && nextRef.current) {
        nextRef.current.focus();
      }
      if (shouldGoToPrevRef && prevRef && prevRef.current) {
        prevRef.current.focus();
      }
      setPhoneInputState(newState);
    };

  render() {
    const { phoneInputState } = this.props;

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
            onChange={this.createOnChangeHandler(0)}
            ref={this.ref1}
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
            onChange={this.createOnChangeHandler(1)}
            ref={this.ref2}
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
            onChange={this.createOnChangeHandler(2)}
            ref={this.ref3}
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
            onChange={this.createOnChangeHandler(3)}
            ref={this.ref4}
            placeholder="5"
            maxLength={1}
          />
        </div>
      </div>
    );
  }
}

export default PhoneInput;

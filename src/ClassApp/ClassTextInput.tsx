import { Component, ComponentProps } from "react";

class TextInput extends Component<{
  labelText: string;
  inputProps: ComponentProps<"input">;
}> {
  render() {
    const { labelText, inputProps } = this.props;

    return (
      <div className="input-wrap">
        <label htmlFor="name">{labelText}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}

export default TextInput;

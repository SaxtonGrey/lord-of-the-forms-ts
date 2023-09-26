import { ComponentProps } from "react";

export default function FunctionalTextInput({
  labelText,
  inputProps,
}: {
  labelText: string;
  inputProps: ComponentProps<"input">;
}) {
  return (
    <div className="input-wrap">
      <label htmlFor="name">{labelText}:</label>
      <input type="text" {...inputProps}></input>
    </div>
  );
}

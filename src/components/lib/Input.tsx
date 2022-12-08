import type { Component, JSX } from "solid-js";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input: Component<InputProps> = (props) => {
  return <input class="border outline-none" {...props} />;
};

export default Input;

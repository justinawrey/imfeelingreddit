import type { ParentComponent, JSX } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: ParentComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      class="border border-orange-400 hover:border-orange-300 px-1 rounded bg-orange-200 hover:bg-orange-100 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: "button" | "a";
    variant?: "default" | "primary" | "outline";
  };

export default function Button({
  children,
  as = "button",
  variant = "default",
  className,
  ...rest
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]}${className ? " " + className : ""}`;
  if (as === "a") {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
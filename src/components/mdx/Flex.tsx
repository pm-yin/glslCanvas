import clsx from "clsx";
import styles from "./flex.module.scss";

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "column";
  gap?: string;
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
};

export default function Flex({
  children,
  direction = "row",
  gap = "1rem",
  align = "stretch",
  justify = "flex-start",
  className,
  style,
  ...rest
}: FlexProps) {
  const flexDirectionClass = direction === "row" ? styles["flex-row"] : "";
  return (
    <div
      className={clsx(styles.flex, flexDirectionClass, className)}
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
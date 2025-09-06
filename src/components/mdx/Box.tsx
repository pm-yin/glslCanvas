type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export default function Box({
  as: Component = "div",
  children,
  className,
  style,
  ...rest
}: BoxProps) {
  return (
    <Component className={className} style={style} {...rest}>
      {children}
    </Component>
  );
}
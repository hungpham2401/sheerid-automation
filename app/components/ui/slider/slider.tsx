import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import classNames from "classnames";
import styles from "./slider.module.css";
// ToDo: handle vertical orientation
const Slider: React.FC<React.ComponentProps<typeof SliderPrimitive.Root>> = ({
  className,
  defaultValue,
  value,
  disabled,
  ...props
}) => {
  const isRangeSlider = value ? value.length > 1 : defaultValue?.length === 2;
  return (
    <SliderPrimitive.Root
      className={classNames(styles.root, className)}
      {...props}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={styles.thumb} />
      {isRangeSlider && <SliderPrimitive.Thumb className={styles.thumb} />}
    </SliderPrimitive.Root>
  );
};
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

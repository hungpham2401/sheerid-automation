import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import classNames from "classnames";
import styles from "./input-otp.module.css";

const InputOTP: React.FC<React.ComponentProps<typeof OTPInput>> = ({ className, containerClassName, ...props }) => (
  <OTPInput
    containerClassName={classNames(styles.container, containerClassName)}
    className={classNames(styles.input, className)}
    {...props}
  />
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.group, className)} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot: React.FC<React.ComponentProps<"div"> & { index: number }> = ({ index, className, ...props }) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div className={classNames(styles.slot, isActive && styles.slotActive, className)} {...props}>
      {char}
      {hasFakeCaret && (
        <div className={styles.caret}>
          <div className={styles.caretLine} />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator: React.FC<React.ComponentProps<"div">> = ({ ...props }) => (
  <div role="separator" {...props}>
    <Dot />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

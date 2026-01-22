import { Toaster as Sonner } from "sonner";
import styles from "./sonner.module.css";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className={styles.toaster}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          description: styles.description,
          actionButton: styles.actionButton,
          cancelButton: styles.cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

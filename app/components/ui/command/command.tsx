import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import classNames from "classnames";
import { Dialog, DialogContent } from "~/components/ui/dialog/dialog";
import styles from "./command.module.css";

const Command: React.FC<React.ComponentProps<typeof CommandPrimitive>> = ({ className, ...props }) => (
  <CommandPrimitive className={classNames(styles.root, className)} {...props} />
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className={styles.dialog}>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput: React.FC<React.ComponentProps<typeof CommandPrimitive.Input>> = ({ className, ...props }) => (
  <div className={styles.inputWrapper} cmdk-input-wrapper="">
    <Search className={styles.searchIcon} />
    <CommandPrimitive.Input className={classNames(styles.input, className)} {...props} />
  </div>
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList: React.FC<React.ComponentProps<typeof CommandPrimitive.List>> = ({ className, ...props }) => (
  <CommandPrimitive.List className={classNames(styles.list, className)} {...props} />
);
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty: React.FC<React.ComponentProps<typeof CommandPrimitive.Empty>> = (props) => (
  <CommandPrimitive.Empty className={styles.empty} {...props} />
);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup: React.FC<React.ComponentProps<typeof CommandPrimitive.Group>> = ({ className, ...props }) => (
  <CommandPrimitive.Group className={classNames(styles.group, className)} {...props} />
);
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator: React.FC<React.ComponentProps<typeof CommandPrimitive.Separator>> = ({
  className,
  ...props
}) => <CommandPrimitive.Separator className={classNames(styles.separator, className)} {...props} />;
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem: React.FC<React.ComponentProps<typeof CommandPrimitive.Item>> = ({ className, ...props }) => (
  <CommandPrimitive.Item className={classNames(styles.item, className)} {...props} />
);
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={classNames(styles.shortcut, className)} {...props} />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

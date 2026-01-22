import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";
import classNames from "classnames";
import { useIsMobile } from "~/hooks/use-mobile";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Sheet, SheetContent } from "~/components/ui/sheet/sheet";
import { Skeleton } from "~/components/ui/skeleton/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip/tooltip";
import styles from "./sidebar.module.css";

// Constants
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

const SidebarProvider: React.FC<
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    variant?: "sidebar" | "floating" | "inset"; // Added missing variant prop
  }
> = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  variant, // Add variant to destructuring
  ...props
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(openState);
      else _setOpen(openState);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={classNames(styles.wrapper, className)}
          data-has-inset={variant === "inset" ? "true" : undefined}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};
SidebarProvider.displayName = "SidebarProvider";

const Sidebar: React.FC<
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
> = ({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div className={classNames(styles.sidebar, className)} {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className={styles.mobileContent}
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          side={side}
        >
          <div className={styles.mobileInner}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={classNames(styles.sidebar, className)}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      {...props}
    >
      <div className={styles.fixedWrapper}>
        <div
          className={classNames(styles.sidebarContent, {
            [styles.contentFloating]: variant === "floating",
          })}
          data-variant={variant}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
Sidebar.displayName = "Sidebar";

const SidebarTrigger: React.FC<React.ComponentProps<typeof Button>> = ({ className, onClick, ...props }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="link"
      size="icon"
      className={classNames(styles.trigger, className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft className={styles.triggerIcon} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail: React.FC<React.ComponentProps<"button">> = ({ className, ...props }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={classNames(styles.rail, className)}
      {...props}
    />
  );
};
SidebarRail.displayName = "SidebarRail";

const SidebarInset: React.FC<React.ComponentProps<"main">> = ({ className, ...props }) => {
  return <main className={classNames(styles.inset, className)} {...props} />;
};
SidebarInset.displayName = "SidebarInset";

const SidebarInput: React.FC<React.ComponentProps<typeof Input>> = ({ className, ...props }) => {
  return <Input data-sidebar="input" className={classNames(styles.input, className)} {...props} />;
};
SidebarInput.displayName = "SidebarInput";

const SidebarHeader: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  return <div data-sidebar="header" className={classNames(styles.header, className)} {...props} />;
};
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  return <div data-sidebar="footer" className={classNames(styles.footer, className)} {...props} />;
};
SidebarFooter.displayName = "SidebarFooter";

const SidebarContent: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  return <div data-sidebar="content" className={classNames(styles.mainContent, className)} {...props} />;
};
SidebarContent.displayName = "SidebarContent";

const SidebarGroup: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  return <div data-sidebar="group" className={classNames(styles.group, className)} {...props} />;
};
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel: React.FC<React.ComponentProps<"div"> & { asChild?: boolean }> = ({
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "div";

  return <Comp data-sidebar="group-label" className={classNames(styles.groupLabel, className)} {...props} />;
};
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction: React.FC<React.ComponentProps<"button"> & { asChild?: boolean }> = ({
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return <Comp data-sidebar="group-action" className={classNames(styles.groupAction, className)} {...props} />;
};
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div data-sidebar="group-content" className={classNames(styles.groupContent, className)} {...props} />
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu: React.FC<React.ComponentProps<"ul">> = ({ className, ...props }) => (
  <ul data-sidebar="menu" className={classNames(styles.menu, className)} {...props} />
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem: React.FC<React.ComponentProps<"li">> = ({ className, ...props }) => (
  <li data-sidebar="menu-item" className={classNames(styles.menuItem, className)} {...props} />
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuButton: React.FC<
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg";
  }
> = ({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const menuButtonClasses = classNames(
    styles.menuButton,
    {
      [styles.menuButtonActive]: isActive,
      [styles.menuButtonOutline]: variant === "outline",
      [styles.menuButtonSm]: size === "sm",
      [styles.menuButtonLg]: size === "lg",
    },
    className
  );

  const button = (
    <Comp data-sidebar="menu-button" data-size={size} data-active={isActive} className={menuButtonClasses} {...props} />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = { children: tooltip };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
};
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction: React.FC<React.ComponentProps<"button"> & { asChild?: boolean; showOnHover?: boolean }> = ({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-sidebar="menu-action"
      data-show-on-hover={showOnHover ? "true" : undefined}
      className={classNames(styles.menuAction, className)}
      {...props}
    />
  );
};
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div data-sidebar="menu-badge" className={classNames(styles.menuBadge, className)} {...props} />
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton: React.FC<React.ComponentProps<"div"> & { showIcon?: boolean }> = ({
  className,
  showIcon = false,
  ...props
}) => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div data-sidebar="menu-skeleton" className={classNames(styles.menuSkeleton, className)} {...props}>
      {showIcon && <Skeleton className={styles.menuSkeletonIcon} data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className={styles.menuSkeletonText}
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
};
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub: React.FC<React.ComponentProps<"ul">> = ({ className, ...props }) => (
  <ul data-sidebar="menu-sub" className={classNames(styles.menuSub, className)} {...props} />
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem: React.FC<React.ComponentProps<"li">> = ({ className, ...props }) => (
  <li data-sidebar="menu-sub-item" className={classNames(styles.menuSubItem, className)} {...props} />
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton: React.FC<
  React.ComponentProps<"a"> & { asChild?: boolean; size?: "sm" | "md"; isActive?: boolean }
> = ({ asChild = false, size = "md", isActive, className, ...props }) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={classNames(
        styles.menuSubButton,
        {
          [styles.menuSubButtonActive]: isActive,
          [styles.menuSubButtonSm]: size === "sm",
        },
        className
      )}
      {...props}
    />
  );
};
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};

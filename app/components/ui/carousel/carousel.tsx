import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import classNames from "classnames";
import { Button } from "~/components/ui/button/button";
import styles from "./carousel.module.css";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel: React.FC<React.ComponentProps<"div"> & CarouselProps> = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={classNames(styles.root, className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};
Carousel.displayName = "Carousel";

const CarouselContent: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className={styles.viewport}>
      <div
        className={classNames(
          styles.container,
          orientation === "horizontal" ? styles.containerHorizontal : styles.containerVertical,
          className
        )}
        {...props}
      />
    </div>
  );
};
CarouselContent.displayName = "CarouselContent";

const CarouselItem: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  const { orientation } = useCarousel();
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={classNames(
        styles.item,
        orientation === "horizontal" ? styles.itemHorizontal : styles.itemVertical,
        className
      )}
      {...props}
    />
  );
};
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious: React.FC<React.ComponentProps<typeof Button>> = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      variant={variant}
      size={size}
      className={classNames(
        styles.button,
        styles.previous,
        orientation === "horizontal" ? styles.buttonHorizontal : styles.buttonVertical,
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className={styles.icon} />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext: React.FC<React.ComponentProps<typeof Button>> = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      variant={variant}
      size={size}
      className={classNames(
        styles.button,
        styles.next,
        orientation === "horizontal" ? styles.buttonHorizontal : styles.buttonVertical,
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className={styles.icon} />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

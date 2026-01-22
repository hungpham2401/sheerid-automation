import * as React from "react";
import * as RechartsPrimitive from "recharts";
import classNames from "classnames";
import styles from "./chart.module.css";

const THEMES = { light: "", dark: ".dark" } as const;

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartContainer: React.FC<
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
> = ({ id, className, children, config, ...props }) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div data-chart={chartId} className={classNames(styles.container, className)} {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};
ChartContainer.displayName = "ChartContainer";

const ChartTooltipContent: React.FC<
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: any[];
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    labelFormatter?: (label: string, payload: any[]) => React.ReactNode;
    formatter?: (value: number, name: string, item: any, index: number, payload: any) => React.ReactNode;
  }
> = ({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel,
  hideIndicator,
  labelFormatter,
  formatter,
  ...props
}) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div className={classNames(styles.tooltip, className)} {...props}>
      {!hideLabel && payload[0]?.value && (
        <div className={styles.tooltipLabel}>{labelFormatter?.(payload[0].value, payload) ?? payload[0].value}</div>
      )}
      <div className={styles.tooltipRows}>
        {payload.map((item, index) => (
          <div key={item.name} className={styles.tooltipRow}>
            {!hideIndicator && <div className={styles.tooltipIndicator} style={{ backgroundColor: item.color }} />}
            <span className={styles.tooltipName}>{config[item.dataKey]?.label ?? item.name}</span>
            <span className={styles.tooltipValue}>
              {formatter?.(item.value, item.name, item, index, item.payload) ?? item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend: React.FC<
  React.ComponentProps<"div"> & {
    payload?: any[];
    verticalAlign?: "top" | "bottom";
  }
> = ({ className, payload, verticalAlign = "bottom", ...props }) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={classNames(styles.legend, verticalAlign === "top" ? styles.legendTop : styles.legendBottom, className)}
      {...props}
    >
      {payload.map((item) => (
        <div key={item.value} className={styles.legendItem}>
          <div className={styles.legendIndicator} style={{ backgroundColor: item.color }} />
          <span>{config[item.dataKey]?.label ?? item.value}</span>
        </div>
      ))}
    </div>
  );
};
ChartLegend.displayName = "ChartLegend";

export { type ChartConfig, ChartContainer, ChartTooltipContent, ChartLegend, ChartStyle, useChart };

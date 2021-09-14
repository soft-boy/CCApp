import React from "react";
import { View } from "react-native";
import {
  Defs,
  G,
  LinearGradient,
  Rect,
  Stop,
  Svg,
  Text
} from "react-native-svg";

import AbstractChart from "./AbstractChart";

const BAR_WIDTH = 24;

class BarChart extends AbstractChart {
  getBarPercentage = () => {
    const { barPercentage = 1 } = this.props.chartConfig;
    return barPercentage;
  };

  renderBars = ({
    data,
    width,
    height,
    paddingTop,
    paddingRight,
    barRadius,
  }) => {
    const baseHeight = this.calcBaseHeight(data, height);

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const barWidth = BAR_WIDTH * this.getBarPercentage();
      return (
        <Rect
          key={Math.random()}
          x={
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          rx={barRadius}
          width={barWidth}
          height={(Math.abs(barHeight) / 4) * 3}
          fill="#2274A5D0"
        />
      );
    });
  };

  renderColors = ({
    data,
    flatColor
  }) => {
    return data.map((dataset, index) => (
      <Defs key={dataset.key ?? index}>
        {dataset.colors?.map((color, colorIndex) => {
          const highOpacityColor = color(1.0);
          const lowOpacityColor = color(0.1);

          return (
            <LinearGradient
              id={`customColor_${index}_${colorIndex}`}
              key={`${index}_${colorIndex}`}
              x1={0}
              y1={0}
              x2={0}
              y2={1}
            >
              <Stop offset="0" stopColor={highOpacityColor} stopOpacity="1" />
              {flatColor ? (
                <Stop offset="1" stopColor={highOpacityColor} stopOpacity="1" />
              ) : (
                  <Stop offset="1" stopColor={lowOpacityColor} stopOpacity="0" />
                )}
            </LinearGradient>
          );
        })}
      </Defs>
    ));
  };

  render() {
    const {
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      verticalLabelRotation = 0,
      horizontalLabelRotation = 0,
      withInnerLines = true,
      withCustomBarColorFromData = false,
      showValuesOnTopOfBars = false,
      flatColor = false,
      segments = 6
    } = this.props;

    const { borderRadius = 0, paddingTop = 16, paddingRight = 24 } = style;

    const config = {
      width,
      height,
      verticalLabelRotation,
      horizontalLabelRotation,
      barRadius:
        (this.props.chartConfig && this.props.chartConfig.barRadius) || 0,
      decimalPlaces:
        (this.props.chartConfig && this.props.chartConfig.decimalPlaces) ?? 2,
      formatYLabel:
        (this.props.chartConfig && this.props.chartConfig.formatYLabel) ||
        function (label) {
          return label;
        },
      formatXLabel:
        (this.props.chartConfig && this.props.chartConfig.formatXLabel) ||
        function (label) {
          return label;
        }
    };

    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          {this.renderColors({
            ...this.props.chartConfig,
            flatColor: flatColor,
            data: this.props.data.datasets
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {withInnerLines
              ? this.renderHorizontalLines({
                ...config,
                count: segments,
                paddingTop,
                paddingRight: paddingRight
              })
              : null}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                ...config,
                count: segments,
                data: data.datasets[0].data,
                paddingTop: paddingTop,
                paddingRight: paddingRight
              })
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                ...config,
                labels: data.labels,
                paddingRight: paddingRight,
                paddingTop: paddingTop,
                horizontalOffset: BAR_WIDTH * this.getBarPercentage()
              })
              : null}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop: paddingTop,
              paddingRight: paddingRight,
              withCustomBarColorFromData: withCustomBarColorFromData
            })}
          </G>
        </Svg>
      </View>
    );
  }
}

export default BarChart;

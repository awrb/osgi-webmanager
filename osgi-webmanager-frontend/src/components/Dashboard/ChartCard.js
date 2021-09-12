import React, { useState } from "react";
import { CardContent, CardHeader, Divider } from "@material-ui/core";
import { PieChart } from "react-minimal-pie-chart";
import ReactTooltip from "react-tooltip";
import RoundedCard from "./RoundedCard";

const ChartCard = ({ chartTitle, labels, data, className }) => {
  const [hovered, setHovered] = useState(null);

  data = data.filter((d) => d.value > 0);
  return (
    <RoundedCard className={className}>
      <CardHeader title={chartTitle} />
      <Divider />
      <CardContent data-tip="" data-for="chart">
        <PieChart
          animate={true}
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
          onMouseOut={() => {
            setHovered(null);
          }}
          label={({ dataEntry }) => dataEntry.value * 100 + "%"}
          data={data}
        />
        <ReactTooltip
          id="chart"
          getContent={() => {
            if (typeof hovered === "number") {
              return labels[hovered];
            }
            return null;
          }}
        />
      </CardContent>
    </RoundedCard>
  );
};

export default ChartCard;

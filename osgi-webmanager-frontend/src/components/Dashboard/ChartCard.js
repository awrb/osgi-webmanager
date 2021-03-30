import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";
import { PieChart } from "react-minimal-pie-chart";
import ReactTooltip from "react-tooltip";

const ChartCard = ({ chartTitle, labels }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <Card variant="outlined">
      <CardHeader title={chartTitle} />
      <Divider />
      <CardContent data-tip="" data-for="chart">
        <PieChart
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
          onMouseOut={() => {
            setHovered(null);
          }}
          label={({ dataEntry }) => dataEntry.value + "%"}
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" },
          ]}
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
    </Card>
  );
};

export default ChartCard;

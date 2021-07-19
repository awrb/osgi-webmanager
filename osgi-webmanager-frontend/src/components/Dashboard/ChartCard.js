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

const ChartCard = ({ chartTitle, labels, data }) => {
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
    </Card>
  );
};

export default ChartCard;

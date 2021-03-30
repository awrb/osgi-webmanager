import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "12vw",
    height: "20vh",
    display: "flex",
    margin: "3vh",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  number: { fontWeight: 600 },
});

const InfoCard = ({ label, number, textColor }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent style={{ color: textColor || "#000" }}>
        <Typography className={classes.number} variant="h3">
          {number}
        </Typography>
        <Typography variant="body1">{label}</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

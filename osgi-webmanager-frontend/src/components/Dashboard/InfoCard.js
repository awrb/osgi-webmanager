import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import RoundedCard from "./RoundedCard";
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
    borderRadius: 25,
  },
  number: { fontWeight: 600 },
});

const InfoCard = ({ label, number, textColor }) => {
  const classes = useStyles();
  return (
    <RoundedCard className={classes.card}>
      <CardContent style={{ color: textColor || "#000" }}>
        <Typography className={classes.number} variant="h3">
          {number}
        </Typography>
        <Typography variant="body1">{label}</Typography>
      </CardContent>
    </RoundedCard>
  );
};

export default InfoCard;

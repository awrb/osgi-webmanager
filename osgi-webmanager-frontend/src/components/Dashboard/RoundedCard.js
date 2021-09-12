import { Card } from "@material-ui/core";

const RoundedCard = (props) => {
  return (
    <Card
      elevation={4}
      elevation5
      style={{ borderRadius: 25, borderStyle: "solid", borderWidth: 1 }}
      {...props}
    >
      {props.children}
    </Card>
  );
};

export default RoundedCard;

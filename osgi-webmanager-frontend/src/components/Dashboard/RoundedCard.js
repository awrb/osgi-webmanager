import { Card } from "@material-ui/core";

const RoundedCard = (props) => {
  return (
    <Card elevation={4} style={{ borderRadius: 25 }} {...props}>
      {props.children}
    </Card>
  );
};

export default RoundedCard;

import "./App.css";

function Die(props: {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
  }
  ) {
  const styles = {
    backgroundColor: props.isHeld ? "green" : "white",
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;

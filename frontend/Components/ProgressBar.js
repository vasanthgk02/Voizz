import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";

const ProgressBar = ({ value }) => {
  return (
    <CircularProgress
      radius={100}
      value={value}
      textColor="#222"
      fontSize={20}
      title={"efficiency"}
      valueSuffix={"%"}
      inActiveStrokeColor={"#2ecc71"}
      inActiveStrokeOpacity={0.2}
      inActiveStrokeWidth={6}
      duration={3000}
    />
  );
};

export default ProgressBar;

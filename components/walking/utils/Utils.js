
// Sensor value comparison function
export const hasSignificantChange = (newData, lastData, THRESHOLD = 0.000000000000001) => {
    return (
      Math.abs(newData.x - lastData.x) > THRESHOLD ||
      Math.abs(newData.y - lastData.y) > THRESHOLD ||
      Math.abs(newData.z - lastData.z) > THRESHOLD
    );
  };
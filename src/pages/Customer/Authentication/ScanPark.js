import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanPark = () => {
  const [data, setData] = React.useState("Not Found");
  return (
    <div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </div>
  );
};

export default ScanPark;

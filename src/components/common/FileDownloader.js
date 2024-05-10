import React from "react";
import { Flex } from "@chakra-ui/react";

const FileDownloader = ({ url, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + url.replace("/", "")
      );
      const blob = await response.blob();
      const href = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = href;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Flex
      border="1px solid #cccccc"
      borderRadius="4px"
      py="8px"
      fontSize="12px"
      cursor="pointer"
      fontWeight={500}
      color="#090C02"
      px="16px"
      onClick={handleDownload}
    >
      Download
    </Flex>
  );
};

export default FileDownloader;

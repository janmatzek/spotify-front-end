import React from "react";
import { Spinner } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Spinner
        size="xl"
        color="teal.500"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
      />
    </div>
  );
};

export default LoadingIndicator;

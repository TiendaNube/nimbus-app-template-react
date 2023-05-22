import React from "react";
import { Box, Button, Text } from "@nimbus-ds/components";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("state.status ", state.status);

  // const noAccessToken = () => {
  //   if (state.status === 400) {
  //     return "Volte ao partners portal e instale o seu app";
  //   }
  // };
  return (
    <Box
      position="absolute"
      height="100vh"
      width="100%"
      top="0"
      left="0"
      backgroundColor="neutral-background"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <>
        {/* {state.statusCode } */}
        <Text color="danger-interactive">
          {state.status === 400
            ? "Volte ao partners portal e instale o app"
            : `${state.message}`}
        </Text>
        {/* {noAccessToken} */}
      </>
      <Box marginTop="4">
        <Button as="a" onClick={() => navigate("/")}>
          try again
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;

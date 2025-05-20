import { Alert, Stack } from "@chakra-ui/react";

const AlertCheck = ({
  message,
  description,
  status = "success",
  variant = "solid"
}) => {
  return (
    <Stack gap="4">
      <Alert.Root status={status} variant={variant}>
        <Alert.Indicator />
        <Stack spacing="1">
          <Alert.Title>{message}</Alert.Title>
          {description && <Alert.Description>{description}</Alert.Description>}
        </Stack>
      </Alert.Root>
    </Stack>
  );
};

export default AlertCheck;
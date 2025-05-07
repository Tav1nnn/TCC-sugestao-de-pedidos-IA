// components/EditableField.jsx
import { Input, Text, HStack, Button } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const EditableField = ({ value, onChange, onSave, isEditable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  if (!isEditable) {
    return <Text>{value}</Text>;
  }

  return (
    <HStack>
      {isEditing ? (
        <>
          <Input
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            size="sm"
            color={"black"}
          />
          <Button
            onClick={() => {
              onChange(internalValue);
              onSave?.();
              setIsEditing(false);
            }}
            size="sm"
          ><FaCheck/>
          </Button>
        </>
      ) : (
        <Text onClick={() => setIsEditing(true)} cursor="pointer">
          {value}
        </Text>
      )}
    </HStack>
  );
};

export default EditableField;

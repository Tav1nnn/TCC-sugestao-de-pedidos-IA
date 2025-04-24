import { useState } from "react";
import { Box, Button, Input, VStack, Alert } from "@chakra-ui/react";
import axios from "axios";
import { IoMdAlert } from "react-icons/io";

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        document: "",
        address: "",
        phone: "",
        imageUrl: ""
    });

    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await axios.post("http://localhost:8080/api/users/register", formData);
            if (response.status === 201) {
                setStatus("success");
                setMessage("Cadastro realizado com sucesso!");
            }
        } catch (error) {
            const errMsg = error.response?.data || "Erro ao cadastrar";
            setStatus("error");
            setMessage(errMsg);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt="4">
            <form onSubmit={handleSubmit}>
                <VStack spacing={3}>
                    {["name", "email", "password", "document", "address", "phone", "imageUrl"].map((field) => (
                        <Input
                            key={field}
                            name={field}
                            type={field === "password" ? "password" : "text"}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            isRequired
                        />
                    ))}
                    <Button type="submit" colorScheme="blue" w="full">Cadastrar</Button>
                    {message && (
                                  <Alert.Root status={status} borderRadius="md">
                                    <IoMdAlert />
                                    {message}
                                  </Alert.Root>
                                )}
                </VStack>
            </form>
        </Box>
    );
};

export default UserRegister;

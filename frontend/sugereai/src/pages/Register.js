import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Image,
    Input,
    Text,
    VStack,
    Alert,
  } from "@chakra-ui/react";
  import { AiOutlineClose } from "react-icons/ai";
  import {
    FaUser,
    FaEnvelope,
    FaIdCard,
    FaPhone,
    FaMapMarkerAlt,
  } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import logo from "../images/Logo preta escrita.png";
  import "../styles/Register.css";
  import { useState } from "react";
  import axios from "axios";
  import { IoMdAlert } from "react-icons/io";
  
  const UserRegistration = () => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "123", // default ou criar campo visível
      document: "",
      address: "",
      phone: "",
      imageUrl:
        "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    });
  
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
  
    const handleChange = (e) => {
      const { placeholder, value } = e.target;
      const mapping = {
        Nome: "name",
        Email: "email",
        "CPF ou RG": "document",
        Telefone: "phone",
        Endereço: "address",
      };
      const key = mapping[placeholder];
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  
    const handleRegister = async () => {
      setMessage(null);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/register",
          formData
        );
        if (response.status === 201) {
          setStatus("success");
          setMessage("Cadastro realizado com sucesso!");
          setFormData((prev) => ({
            ...prev,
            name: "",
            email: "",
            document: "",
            address: "",
            phone: "",
          }));
        }
      } catch (error) {
        const errMsg = error.response?.data || "Erro ao cadastrar usuário";
        setStatus("error");
        setMessage(errMsg);
      }
    };
  
    return (
      <Box className="register-container">
        <Flex className="register-header">
          <Box className="register-header-image">
            <Image
              src={formData.imageUrl}
              alt="Foto de usuário"
            />
          </Box>
  
          <Heading className="register-logo">
            <Image src={logo} alt="Logo SugereAI" />
          </Heading>
  
          <Button
            onClick={() => navigate(-1)}
            bg={"#2D2C31"}
            border={"2px solid #f7bb75"}
            color={"white"}
            className="register-back-button"
          >
            <AiOutlineClose />
          </Button>
        </Flex>
  
        <Flex className="register-content">
          <Box className="register-image-container">
            <Image
              src={formData.imageUrl}
              alt="Foto do usuário"
              className="register-image"
            />
          </Box>
  
          <VStack className="register-info-container" spacing={4}>
            <Flex className="register-info-item">
              <Icon as={FaUser} className="register-info-icon" />
              <Input
                placeholder="Nome"
                className="register-info-input"
                value={formData.name}
                onChange={handleChange}
              />
            </Flex>
  
            <Flex className="register-info-item">
              <Icon as={FaEnvelope} className="register-info-icon" />
              <Input
                placeholder="Email"
                className="register-info-input"
                value={formData.email}
                onChange={handleChange}
              />
            </Flex>
  
            <Flex className="register-info-item">
              <Icon as={FaIdCard} className="register-info-icon" />
              <Input
                placeholder="CPF ou RG"
                className="register-info-input"
                value={formData.document}
                onChange={handleChange}
              />
            </Flex>
  
            <Flex className="register-info-item">
              <Icon as={FaPhone} className="register-info-icon" />
              <Input
                placeholder="Telefone"
                className="register-info-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </Flex>
  
            <Flex className="register-info-item">
              <Icon as={FaMapMarkerAlt} className="register-info-icon" />
              <Input
                placeholder="Endereço"
                className="register-info-input"
                value={formData.address}
                onChange={handleChange}
              />
            </Flex>
  
            <Button
              colorScheme="orange"
              mt={4}
              className="register-button"
              onClick={handleRegister}
            >
              CADASTRAR
            </Button>
  
            {message && (
              <Alert.Root status={status} borderRadius="md">
                <IoMdAlert />
                {message}
              </Alert.Root>
            )}
          </VStack>
        </Flex>
  
        <Flex className="register-footer">
          <Text className="register-footer-contact">Contato: (11) 1234-5678</Text>
          <Text className="register-footer-email">E-mail de atendimento: atendimento@exemplo.com</Text>
        </Flex>
      </Box>
    );
  };
  
  export default UserRegistration;
  
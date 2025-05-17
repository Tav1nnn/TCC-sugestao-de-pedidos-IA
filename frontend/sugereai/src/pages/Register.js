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
import logo from "../images/Logo branca escrita.png";
import "../styles/Register.css";
import { useState } from "react";
import axios from "axios";
import { IoMdLock } from "react-icons/io";
import { cpf } from 'cpf-cnpj-validator'; 

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    document: "",
    address: "",
    phone: "",
    imageUrl:
      "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  const removeMask = (value) => {
    return value.replace(/[^\d]/g, '');
  };

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    const mapping = {
      Nome: "name",
      Email: "email",
      "CPF": "document",
      Telefone: "phone",
      Endereço: "address",
      Senha: "password",
      "Confirme sua senha": "confirmPassword",
    };
    const key = mapping[placeholder];
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    setMessage(null);

    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => key !== "imageUrl" && value.trim() === ""
    );

    setInvalidFields(emptyFields.map(([key]) => key));

    if (emptyFields.length > 0) {
      setStatus("error");
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    const cleanDocument = removeMask(formData.document);
    const cleanPhone = removeMask(formData.phone);

    if (!cpf.isValid(cleanDocument)) {
      setInvalidFields(["document"]);
      setStatus("error");
      setMessage("Por favor, insira um CPF válido.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ((!emailRegex.test(formData.email))
      && formData.email === ""
      && formData.email.length < 100) {
      setInvalidFields(["email"]);
      setStatus("error");
      setMessage("Por favor, insira um e-mail válido.");
      return;
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      setInvalidFields(["phone"]);
      setStatus("error");
      setMessage("Por favor, insira um telefone válido com DDD.");
      return;
    }

    /* if (formData.password.length < 8) && formData.password === "" {
      setInvalidFields(["password"]);
      setStatus("error");
      setMessage("Por favor, a senha precisa ter no mínimo 8 caracteres e um caracter especial.");
      return;
      } */

    if (formData.password !== formData.confirmPassword) {
      setInvalidFields(["password", "confirmPassword"]);
      setStatus("error");
      setMessage("As senhas não coincidem.");
      return;
    }

    setInvalidFields([]);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        { ...formData, document: cleanDocument }
      );
      if (response.status === 201) {
        setStatus("success");
        setMessage("Cadastro realizado com sucesso!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          document: "",
          address: "",
          phone: "",
          imageUrl:
            "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
        });
        navigate("/");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Erro ao cadastrar usuário";
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
          border={"2px solid #A10808"}
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
              isInvalid={invalidFields.includes("name")}
              errorBorderColor="red.500"
            />
          </Flex>

          <Flex className="register-info-item">
            <Icon as={FaEnvelope} className="register-info-icon" />
            <Input
              placeholder="Email"
              className="register-info-input"
              value={formData.email}
              onChange={handleChange}
              isInvalid={invalidFields.includes("email")}
              errorBorderColor="red.500"
            />
          </Flex>

          <Flex className="register-info-item">
            <Icon as={FaIdCard} className="register-info-icon" />
            <Input
              placeholder="CPF ou RG"
              className="register-info-input"
              value={formData.document}
              onChange={handleChange}
              isInvalid={invalidFields.includes("document")}
              errorBorderColor="red.500"
            />
          </Flex>

          <Flex className="register-info-item">
            <Icon as={FaPhone} className="register-info-icon" />
            <Input
              placeholder="Telefone"
              className="register-info-input"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={invalidFields.includes("phone")}
              errorBorderColor="red.500"
            />
          </Flex>

          <Flex className="register-info-item">
            <Icon as={FaMapMarkerAlt} className="register-info-icon" />
            <Input
              placeholder="Endereço"
              className="register-info-input"
              value={formData.address}
              onChange={handleChange}
              isInvalid={invalidFields.includes("address")}
              errorBorderColor="red.500"
            />
          </Flex>

          <Flex className="register-info-item">
            <Icon as={IoMdLock} className="register-info-icon" />
            <Input
              placeholder="Senha"
              className="register-info-input"
              value={formData.password}
              type="password"
              onChange={handleChange}
              isInvalid={invalidFields.includes("password")}
              errorBorderColor="red.500"
              autocomplete="new-password"
            />
          </Flex>

          <Flex className="register-info-item">
            <Icon as={IoMdLock} className="register-info-icon" />
            <Input
              placeholder="Confirme sua senha"
              className="register-info-input"
              value={formData.confirmPassword}
              type="password"
              onChange={handleChange}
              isInvalid={invalidFields.includes("confirmPassword")}
              errorBorderColor="red.500"
              autocomplete="new-password"
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
            <Alert.Root status={status} borderRadius="md" p={4} className="register-alert">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>
                  {message}
                </Alert.Description>
              </Alert.Content>
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

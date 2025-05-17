import {
    Box, Flex, Heading, Image, Text, VStack, Icon, Button, Input
} from "@chakra-ui/react";
import {
    FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt, FaEdit
} from "react-icons/fa";
import logo from '../images/Logo branca escrita.png';
import { AiOutlineClose } from "react-icons/ai";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cpf } from 'cpf-cnpj-validator'; 

import LoadingAnimation from "../components/LoadingAnimation";
import logo1 from '../images/Logo preta escrita.png';
import "../styles/Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) return handleSessionExpired();

            const decoded = jwtDecode(token);
            console.log(decoded);
            const isAdmin = decoded.roles.includes("ROLE_ADMIN");
            const restaurantId = decoded.restaurantId;

            if (isAdmin && restaurantId) {
                const restaurantResponse = await axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const restaurantData = restaurantResponse.data;
                setRestaurant(restaurantData);
                setEditedData(restaurantData);
            } else {
                const userResponse = await axios.get('http://localhost:8080/api/users/getUser', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userData = userResponse.data;
                setUser(userData);
                const { profile, ...rest } = userData;
                setEditedData(rest);
            }
        } catch (error) {
            if (error.response?.status === 401) handleSessionExpired();
            console.error('Erro ao buscar dados:', error);
        }
    };

    const handleSessionExpired = () => {
        alert('Sessão expirada. Faça login novamente.');
        navigate('/');
    };

    const handleChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    const validateInputs = () => {
        if (restaurant) {
            const requiredFields = ["name", "description", "address", "phone", "imageUrl"];
            const emptyFields = requiredFields.filter(field => !editedData[field]?.trim());
            if (emptyFields.length > 0) return "Preencha todos os campos obrigatórios.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const removeMask = (value) => value.replace(/\D/g, '');

            const emptyFields = Object.entries(editedData).filter(
                ([key, value]) => key !== "imageURL" && String(value ?? '').trim() === ''
            );
            if (emptyFields.length > 0) return "Preencha todos os campos obrigatórios.";

            if (!emailRegex.test(editedData.email)) return "E-mail inválido.";

            const doc = removeMask(editedData.document);
            if (!cpf.isValid(doc)) return "CPF inválido.";

            const phone = removeMask(editedData.phone);
            if (phone.length < 10 || phone.length > 12) return "Telefone inválido.";

            if (!currentPassword) return "Digite sua senha atual para confirmar.";
        }

        return null;
    };

    const handleSave = async () => {
        const validationMessage = validateInputs();
        if (validationMessage) return alert(validationMessage);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) return handleSessionExpired();

            if (restaurant) {
                await axios.put(`http://localhost:8080/api/restaurants/${restaurant.id}`, editedData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                await fetchUser();
                setEditing(false);
                alert("Restaurante atualizado com sucesso!");
            } else {
                const dataToSend = {
                    ...editedData,
                    password: currentPassword
                };

                await axios.put("http://localhost:8080/api/users/update", dataToSend, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                await fetchUser();
                setEditing(false);
                setCurrentPassword('');
                alert("Dados atualizados com sucesso!");
            }
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) alert("Senha incorreta.");
            else alert("Erro ao salvar alterações.");
            console.error("Erro ao salvar:", error);
        }
    };

    const displayData = restaurant || user;
    if (!displayData) return <LoadingAnimation />;

    const profileFields = restaurant ? [
        { icon: FaUser, label: "name", placeholder: "Nome do Restaurante" },
        { icon: FaMapMarkerAlt, label: "address", placeholder: "Endereço" },
        { icon: FaPhone, label: "phone", placeholder: "Telefone" },
        { icon: FaEnvelope, label: "description", placeholder: "Descrição" },
        { icon: FaIdCard, label: "imageUrl", placeholder: "URL da Imagem" }
    ] : [
        { icon: FaUser, label: "name", placeholder: "Nome" },
        { icon: FaEnvelope, label: "email", placeholder: "Email" },
        { icon: FaIdCard, label: "document", placeholder: "CPF ou RG" },
        { icon: FaPhone, label: "phone", placeholder: "Telefone" },
        { icon: FaMapMarkerAlt, label: "address", placeholder: "Endereço" },
        { icon: FaIdCard, label: "imageUrl", placeholder: "URL da Imagem" }
    ];

    return (
        <Box className="profile-container">
            <Flex className="profile-header">
                <Box className="profile-header-image">
                    <Image
                        src={displayData.imageUrl || displayData.imageURL || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                        alt="Foto de perfil"
                    />
                </Box>

                <Heading className="profile-logo">
                    <Image src={logo} alt='Logo SugereAI' />
                </Heading>

                <Button
                    onClick={() => navigate(-1)}
                    bg={'#2D2C31'}
                    border={'2px solid #A10808'}
                    color={'white'}
                    className="back-button-profile"
                >
                    <AiOutlineClose />
                </Button>
            </Flex>

            <Flex className="profile-content">
                <Box className="profile-image-wrapper" position="relative">
                    <Box className="profile-image-container">
                        <Image
                            src={displayData.imageUrl || displayData.imageURL || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                            alt="Foto de perfil"
                            className="profile-image"
                        />
                    </Box>
                    <Button
                        position="absolute"
                        bottom="24px"
                        right="4px"
                        borderRadius="full"
                        className="edit-button"
                        size="sm"
                        onClick={() => setEditing(!editing)}
                        zIndex="1"
                    >
                        <FaEdit />
                    </Button>
                </Box>

                <VStack className="profile-info-container">
                    {profileFields.map(({ icon, label, placeholder }) => (
                        <Flex key={label} className="profile-info-item">
                            <Icon as={icon} className="info-icon" />
                            {editing ? (
                                <Input
                                    value={editedData[label] || ''}
                                    onChange={(e) => handleChange(label, e.target.value)}
                                    placeholder={placeholder}
                                    className="info-input"
                                />
                            ) : (
                                <Text className="info-text">{displayData?.[label] || '—————————'}</Text>
                            )}
                        </Flex>
                    ))}

                    {!restaurant && !editing && (
                        <Flex className="profile-description-box" direction="column" align="start" w="100%">
                            <Text className="description-label">Perfil do Cliente</Text>
                            <Box className="description-text">
                                {user?.profile || 'Nenhuma descrição disponível.'}
                            </Box>
                            <Text className="description-info">
                                Essa descrição é gerada automaticamente por inteligência artificial com base nas suas conversas com nosso chat.
                            </Text>
                        </Flex>
                    )}

                    {!restaurant && editing && (
                        <Flex className="profile-info-item">
                            <Icon as={IoMdLock} className="info-icon" />
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Digite sua senha atual"
                                className="info-input"
                            />
                        </Flex>
                    )}

                    {editing && (
                        <Button backgroundColor={'#A10808'} mt={2} p={4} color={'white'} onClick={handleSave}>
                            Salvar alterações
                        </Button>
                    )}
                </VStack>
            </Flex>

            <Flex className="profile-footer">
                <Text className="footer-contact">Contato: (11) 1234-5678</Text>
                <Text className="footer-email">E-mail de atendimento: atendimento@exemplo.com</Text>
            </Flex>
        </Box>
    );
};

export default Profile;

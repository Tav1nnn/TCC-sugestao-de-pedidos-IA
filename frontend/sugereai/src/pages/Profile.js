import {
    Box, Flex, Heading, Image, Text, VStack, Icon, Button, Input
} from "@chakra-ui/react";
import {
    FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt, FaEdit
} from "react-icons/fa";
import "../styles/Profile.css";
import logo from '../images/Logo branca escrita.png';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";
import { IoMdLock } from "react-icons/io";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');

    const getUser = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
                return;
            }

            const decodedPayload = jwtDecode(token);
            const response = await axios.get('http://localhost:8080/api/users/getUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userData = { ...response.data, ...decodedPayload };
            setUser(userData);
            setEditedData(userData);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
            }
        }
    };

    const handleChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!currentPassword) {
            alert("Por favor, digite sua senha atual para confirmar.");
            return;
        }
    
        const removeMask = (value) => value.replace(/\D/g, '');
    
        const emptyFields = Object.entries(editedData).filter(
          ([key, value]) =>
            key !== "imageURL" && String(value ?? "").trim() === ""
        );
    
        if (emptyFields.length > 0) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
    
        const cleanDocument = removeMask(editedData.document || '');
        const cleanPhone = removeMask(editedData.phone || '');
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editedData.email) || editedData.email.length > 100) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }
    
        if (cleanDocument.length < 8 || cleanDocument.length > 11) {
            alert("Por favor, insira um CPF ou RG válido.");
            return;
        }
    
        if (cleanPhone.length < 10 || cleanPhone.length > 12) {
            alert("Por favor, insira um telefone válido com DDD.");
            return;
        }
    
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
                return;
            }
    
            const dataToSend = {
                ...editedData,
                password: currentPassword,
            };
    
            /*await axios.put("http://localhost:8080/api/users/update", dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });*/
    
            setUser(editedData);
            setEditing(false);
            setCurrentPassword('');
            alert("Dados atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar:", error);
            if (error.response?.status === 401) {
                alert("Senha incorreta. Verifique sua senha atual.");
            } else {
                alert("Erro ao salvar alterações.");
            }
        }
    };    

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return <LoadingAnimation />;
    }

    return (
        <Box className="profile-container">
            <Flex className="profile-header">
                <Box className="profile-header-image" position="relative">
                    <Image
                        src={user?.imageURL || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                        alt="Foto do usuário"
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
                            src={user?.imageURL || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                            alt="Foto do usuário"
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
                        <FaEdit/>
                    </Button>
                </Box>


                <VStack className="profile-info-container">
                    {[
                        { icon: FaUser, label: "name", placeholder: "Nome" },
                        { icon: FaEnvelope, label: "email", placeholder: "Email" },
                        { icon: FaIdCard, label: "document", placeholder: "CPF ou RG" },
                        { icon: FaPhone, label: "phone", placeholder: "Telefone" },
                        { icon: FaMapMarkerAlt, label: "address", placeholder: "Endereço" },
                    ].map(({ icon, label, placeholder }) => (
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
                                <Text className="info-text">{user?.[label] || '—————————'}</Text>
                            )}
                        </Flex>
                    ))}

                    {editing && (
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

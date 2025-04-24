import { Box, Flex, Heading, Image, Text, VStack, Icon, Button } from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Profile.css";
import logo from '../images/Logo preta escrita.png';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
                return;
            }

           const decodedPayload = jwtDecode(token);
           console.log("JWT payload decodificado:", decodedPayload);

            const response = await axios.get('http://localhost:8080/api/users/getUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            setUser(response.data);
            setUser({
                  ...response.data,
                  ...decodedPayload
               });
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
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
                <Box className="profile-header-image">
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
                    border={'2px solid #f7bb75'}
                    color={'white'}
                    className="back-button-profile"
                >
                    <AiOutlineClose />
                </Button>
            </Flex>

            <Flex className="profile-content">
                <Box className="profile-image-container">
                    <Image
                        src= {user?.imageURL || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                        alt="Foto do usuário"
                        className="profile-image"
                    />
                </Box>

                <VStack className="profile-info-container">
                    <Flex className="profile-info-item">
                        <Icon as={FaUser} className="info-icon" />
                        <Text className="info-text">{user?.name || '—————————'}</Text>
                    </Flex>

                    <Flex className="profile-info-item">
                        <Icon as={FaEnvelope} className="info-icon" />
                        <Text className="info-text">{user?.email || '—————————'}</Text>
                    </Flex>

                    <Flex className="profile-info-item">
                        <Icon as={FaIdCard} className="info-icon" />
                        <Text className="info-text">{user?.document || '—————————'}</Text>
                    </Flex>

                    <Flex className="profile-info-item">
                        <Icon as={FaPhone} className="info-icon" />
                        <Text className="info-text">{user?.phone || '—————————'}</Text>
                    </Flex>

                    <Flex className="profile-info-item">
                        <Icon as={FaMapMarkerAlt} className="info-icon" />
                        <Text className="info-text">{user?.address || '—————————'}</Text>
                    </Flex>
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
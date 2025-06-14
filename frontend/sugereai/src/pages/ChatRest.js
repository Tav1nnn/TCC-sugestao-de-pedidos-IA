// Seu código existente...
import { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { Button, Input, Box, Text, Flex, Image } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import logo from '../images/Logo preta escrita.png'; 
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster";

const dotsAnimation = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
`;

export default function ChatRest() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [welcomeSent, setWelcomeSent] = useState(false);
  const emojis = ['😊', '😎', '😍', '🥰', '❤️', '💖', '🔥', '🚀', '🌟', '💃', '🕺', '🥳', '🎉', '🍀', '🌸', '✨', '🙌', '✔', '😉'];
  const { id } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const getRandomEmoji = () => {
    const numEmojis = Math.floor(Math.random() * 3) + 1; // 1 a 3 emojis
    let randomEmojis = '';

    for (let i = 0; i < numEmojis; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      randomEmojis += emojis[randomIndex];
    }

    return randomEmojis;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'request', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const updatedHistory = [
      ...chatHistory,
      { message: { role: "user", content: inputValue, refusal: null }, menuItemResponseDto: null, sides: [] }
    ];

    setChatHistory(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getResult(updatedHistory);

      if (!response) {
        setIsLoading(false);
        return;
      }

      const latestAssistantResponse = response.find(msg => msg.message && msg.message.role === "assistant" && !messages.some(m => m.rawContent === msg.message.content));

      const lastResponseFromServer = response[response.length - 1];


      if (lastResponseFromServer?.message?.role === "assistant") {
        const parsedContent = JSON.parse(lastResponseFromServer.message.content);

        let textForMessage = `SugereAI: ${parsedContent.title}\n`;
        if (parsedContent.dishName && parsedContent.dishName.trim() !== "") {
          textForMessage += `${parsedContent.dishName}\n`;
        }
        textForMessage += parsedContent.message; // Mensagem principal da IA

        if (lastResponseFromServer.sides && lastResponseFromServer.sides.length > 0) {
          textForMessage += "\n\nAcompanhamentos:\n"; // Cabeçalho para a lista
          lastResponseFromServer.sides.forEach(side => {
            textForMessage += `- ${side.name}\n`; // Cada acompanhamento como um item da lista
          });
          if (textForMessage.endsWith('\n')) {
             textForMessage = textForMessage.slice(0, -1);
          }
        }

        let assistantMessage = {
          type: "response",
          text: textForMessage,
          imageUrl: null,
          menuId: null,
          menuName: null,
          menuDescription: null,
          menuPrice: null,
          menuIngredients: parsedContent.ingredients ? (Array.isArray(parsedContent.ingredients) ? parsedContent.ingredients.join(', ') : parsedContent.ingredients) : [],
          detailedSides: lastResponseFromServer.sides || []
        };

        if (lastResponseFromServer?.menuItemResponseDto) {
          assistantMessage.imageUrl = lastResponseFromServer.menuItemResponseDto.imageURL;
          assistantMessage.menuId = lastResponseFromServer.menuItemResponseDto.id;
          assistantMessage.menuName = lastResponseFromServer.menuItemResponseDto.name;
          assistantMessage.menuDescription = lastResponseFromServer.menuItemResponseDto.description;
          assistantMessage.menuPrice = lastResponseFromServer.menuItemResponseDto.price;
          assistantMessage.menuIngredients = lastResponseFromServer.menuItemResponseDto.ingredients.map((ingredient) => ingredient.name).join(', ');

          assistantMessage.action = {
            label: "PROSSEGUIR",
            menuId: lastResponseFromServer.menuItemResponseDto.id
          };
        }
        


        setMessages((prev) => [...prev, assistantMessage]);

        setChatHistory([
          ...updatedHistory,
          {
            message: lastResponseFromServer.message,
            menuItemResponseDto: lastResponseFromServer.menuItemResponseDto,
            sides: lastResponseFromServer.sides || []
          }
        ]);
      }
    } catch (error) {
      console.error('Erro ao buscar resposta:', error);
      setMessages((prev) => [...prev, { type: 'response', text: "Erro ao obter resposta do servidor." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getResult = async (updatedHistory) => {
    try {
      console.log("Envia o histórico para o back:", JSON.stringify(updatedHistory, null, 2));
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        `http://localhost:8080/api/ai/chat/${id}`,
        updatedHistory,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Retorno do back:", JSON.stringify(response.data, null, 2));

      return response.data; 
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
      }
    }
    return null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleProceed = async (menuId) => {
    console.log("Usuário quer prosseguir para o cardápio:", menuId);
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        `http://localhost:8080/api/ai/profile`,
        chatHistory, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      navigate(`/dish/${menuId}`);
    } catch (error) {
      console.error("Erro ao prosseguir:", error);
    }
  };

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toaster.create({
                    title: "Sessão expirada. Faça login novamente.",
                    type: "error",
                    duration: 3000,
                });
        navigate('/'); 
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const name = response.data.name;

        if (!welcomeSent) {
          setMessages([{
            type: 'response',
            text: `Olá, bem-vindo ao ${name}! Você pode pedir sugestões de pratos ou do restaurante. ${getRandomEmoji()}`,
          }]);
          setWelcomeSent(true);
        }
      } catch (error) {
        console.error("Erro ao buscar nome do restaurante:", error);
       
        if (!welcomeSent) { 
             setMessages([{
                type: 'response',
                text: `Olá! Você pode pedir sugestões de pratos. ${getRandomEmoji()}`,
             }]);
             setWelcomeSent(true);
        }
      }
    };
    fetchRestaurantName();
  }, [id, welcomeSent, navigate]); // Adicionado navigate às dependências

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Flex direction="column" minH="100vh" p="20px">
      <Flex mb="10px" w={'100%'} justify={'space-between'}>
        <Image src={logo} alt='Logo SugereAI' width={'40%'} maxW={'200px'} h={'auto'} color={'#2D2C31'} />
        <Button
          onClick={() => navigate(-1)}
          bg={'#2D2C31'}
          border={'2px solid #A10808'}
          borderRadius={'50%'}
          color={'white'}
        >
          <AiOutlineClose />
        </Button>
      </Flex>

      <Box
        minHeight="400px"
        maxHeight="calc(90vh - 80px)"
        overflowY="auto"
        p="20px"
        border="1px solid #A10808"
        borderRadius="8px"
        bg="#2D2C31"
        mb="5px"
        mt='5px'
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            fontSize={'14px'}
            mb="10px"
            alignSelf={msg.type === 'request' ? 'flex-end' : 'flex-start'}
            bg={msg.type === 'request' ? '#A10808' : '#f7bb75'}
            color={msg.type === 'request' ? '#FFFFFF' : '#FFFFFF'}
            ml={msg.type === 'request' ? 'auto' : '0'}
          >
            <Box style={{ whiteSpace: 'pre-line' }}>
              {msg.text}
            </Box>
            <Box style={msg.menuId ? { marginTop: '10px' } : { display: 'none' }}>
              {msg.menuName && <Text fontSize={'14px'} fontWeight={'bold'}>{msg.menuName}</Text>}
            </Box>
            <Box justifyItems={'center'} style={msg.imageUrl ? { marginTop: '0px' } : { display: 'none' }}>
              {msg.imageUrl && <img src={msg.imageUrl} alt="Imagem do Restaurante" width="100" />}
            </Box>
            <Box style={msg.menuId ? { marginTop: '4px' } : { display: 'none' }}>
              {msg.menuDescription && <Text fontSize={'12px'}>{msg.menuDescription}</Text>}
              {msg.menuPrice && <Text fontSize={'12px'}>R$ {msg.menuPrice}</Text>}
                {msg.menuIngredients && msg.menuIngredients.length > 0 && (
                <Text fontSize={'12px'}>Ingredientes: {msg.menuIngredients}</Text>
                )}
            </Box>
            <Box justifyItems={'center'}>
                {msg.action && (
                  <Button
                    onClick={() => handleProceed(msg.action.menuId)}
                  color={'white'}
                    bg='#A10808'
                  p={'10px'}
                  marginTop={'10px'}
                  fontSize={'10px'}
                  maxW={'80%'}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    {msg.action.label}
                  </Button>
                )}
              </Box>
          </Box>
        ))}

        {isLoading && (
          <Box
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            mb="10px"
            alignSelf="flex-start"
            bg="#f7bb75"
            color="#FFFFFF"
            _after={{
              content: '""',
              display: 'inline-block',
              width: '1em',
              animation: `${dotsAnimation} 1.5s infinite steps(4, end)`,
            }}
          >
            Digitando
          </Box>
        )}
        <div ref={chatEndRef} />
      </Box>

      <Flex mt="auto" gap="10px">
        <Input
          placeholder="Você já possui um restaurante em mente?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          flex="1"
          p='6px'
          bg={'#2D2C31'}
          border={'2px solid #A10808'}
        />
        <Button
          background="#2D2C31"
          borderRadius="50%"
          border={'2px solid #A10808'}
          onClick={handleSendMessage}
        >
          <BsFillSendFill color="white" />
        </Button>
      </Flex>
    </Flex>
  );
}
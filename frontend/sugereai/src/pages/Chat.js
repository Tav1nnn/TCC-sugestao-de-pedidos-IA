import { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { Button, Input, Box, Flex, Image } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import logo from '../images/Logo preta escrita.png';
import { BiSolidFoodMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const dotsAnimation = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
`;

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();
  const [welcomeSent, setWelcomeSent] = useState(false);
  const emojis = ['😊','😎','😍','🥰','❤️','💖','🔥','🚀','🌟','💃','🕺','🥳','🎉','🍀','🌸','✨','🙌','😂','✔','😉'];

  const getRandomEmoji = () => {
    const numEmojis = Math.floor(Math.random() * 3) + 1;
    let randomEmojis = '';

    for (let i = 0; i < numEmojis; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      randomEmojis += emojis[randomIndex];
    }
  
    return randomEmojis;
  };

  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'request', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const updatedHistory = [
      ...chatHistory,
      { message: { role: "user", content: inputValue, refusal: null }, restaurantResponseDto: null }
    ];

    setChatHistory(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getResult(updatedHistory);

      if (!response) return;

      const latestAssistantResponse = response[response.length - 1];

      if (latestAssistantResponse?.message?.role === "assistant") {
        const parsedContent = JSON.parse(latestAssistantResponse.message.content);

        let assistantMessage = {
          type: "response",
          text: `SugereAI: ${parsedContent.title} \n ${parsedContent.restaurantName} \n ${parsedContent.message}`,
          imageUrl: null,
          action: null
        };

        if (latestAssistantResponse?.restaurantResponseDto) {
          const restaurant = latestAssistantResponse.restaurantResponseDto;
          assistantMessage.imageUrl = latestAssistantResponse.restaurantResponseDto.imageUrl;

          assistantMessage.action = {
            label: "PROSSEGUIR",
            restaurantId: restaurant.id,
            restaurantName: restaurant.name
          };
        }

        setMessages((prev) => [...prev, assistantMessage]);

        setChatHistory([
          ...updatedHistory,
          { message: latestAssistantResponse.message, restaurantResponseDto: latestAssistantResponse.restaurantResponseDto }
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
        `http://localhost:8080/api/ai/chat`,
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
    }
    return null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleProceed = async (restaurantId) => {
    console.log("Usuário quer prosseguir para o restaurante:", restaurantId);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `http://localhost:8080/api/ai/profile`,
        chatHistory,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )

      console.log(response.data);
      navigate(`/restaurant/${restaurantId}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!welcomeSent) {
      setMessages([{
        type: 'response',
        text: `Olá, bem-vindo ao SugereAI. Você pode pedir sugestões de restaurantes caso não tenha um em mente de acordo com o estilo desejado ou restrição alimentar. ${getRandomEmoji()}`,
      }]);
      setWelcomeSent(true);
    }
  }, [welcomeSent]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Flex direction="column" minH="100vh" p="20px">
      <Flex mb="10px" w={'100%'} justify={'space-between'}>
        <Image src={logo} alt='Logo SugereAI' width={'40%'} h={'auto'} maxW={'200px'} color={'#2D2C31'} />
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
        mt="5px"
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
            <Box justifyItems={'center'} style={msg.imageUrl ? { marginTop: '10px' } : { display: 'none' }}>
              {msg.imageUrl && <img src={msg.imageUrl} alt="Imagem do Restaurante" width="100" />}
            </Box>
            <Box justifyItems={'center'} >
              {msg.action && (
                <Button
                  onClick={() => handleProceed(msg.action.restaurantId)}
                  color={'white'}
                  bg='#A10808'
                  p={'10px'}
                  marginTop={'10px'}
                  fontSize={'10px'}
                  maxW={'80%'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  {msg.action.label} <BiSolidFoodMenu color='white' />
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
        <Box></Box>
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

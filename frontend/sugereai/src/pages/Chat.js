import { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { Button, Input, Box, Text, Flex, Image } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import logo from '../images/Logo preta escrita.png';
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const dotsAnimation = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
`;

export default function ChatPage() {

  const requestBody = [{
    message: {
      role: "user",
      content: "quero comida italiana",
      refusal: null
    },
    restaurantResponseDto: null
  }];

  const getResult = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/api/chat`, requestBody);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'request', text: inputValue };
    const responseChat = {type: 'response', text: 'eae meu truta'}
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = { type: 'response', text: `SugereAI: "${responseChat.text}"` };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Flex direction="column" minH="100vh" p="20px">
      <Flex mb="10px" w={'100%'} justify={'space-between'}>
          <Image src={logo} alt = 'Logo SugereAI' width={'40%'} h={'auto'} color={'#2D2C31'}/>
          <a href='http://localhost:3000/home' rel='noopener noreferrer'>
            <Button bg={'#2D2C31'} border={'2px solid #A10808'} borderRadius={'50%'} color={'white'}>
              <AiOutlineClose  />
              {/*<PiOpenAiLogoBold className='icon-ia'/> */}
            </Button>
          </a>
      </Flex>

      <Text mb="20px" textAlign="center" color={'black'}>
        Fale para nós o que você deseja!
      </Text>

      <Box
        flex="1"
        overflowY="auto"
        p="20px"
        border="1px solid #A10808"
        borderRadius="8px"
        bg="#2D2C31"
        mb="20px"
        display="flex"
        flexDirection="column"
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            mb="10px"
            alignSelf={msg.type === 'request' ? 'flex-end' : 'flex-start'}
            bg={msg.type === 'request' ? '#A10808' : '#f7bb75'}
            color={msg.type === 'request' ? '#FFFFFF' : '#FFFFFF'}
            ml={msg.type === 'request' ? 'auto' : '0'}
          >
            {msg.text}
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
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          flex="1"
          p='6px'
          bg={'#2D2C31'}
          border={'2px solid #A10808'}
        />
        <Button
          background="#2D2C31"
          borderRadius="50%"
          border={'2px solid #A10808'}
          onClick={()=>getResult()}
        >
          <BsFillSendFill color="white" />
        </Button>
      </Flex>
    </Flex>
  );
}

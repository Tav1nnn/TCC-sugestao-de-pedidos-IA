import React from 'react';
import { Box, Input, Button, Image, VStack } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import wallpaper from '../images/wallpaper2.jpg';

const Login = () => {
  return (
    <Box
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage={`url(${wallpaper})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box
        bg="#EDD8C4"
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="400px"
        w="full"
        textAlign="center"
      >
        <Image
          src="https://your-logo.gif" 
          alt="Logo"
          boxSize="100px"
          mx="auto"
        />
        <VStack spacing={4} mt={6}>
          <FormControl>
            <FormLabel htmlFor="email" color="#A10808" fontWeight="bold">
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              bg="white"
              borderColor="#A10808"
              _hover={{ borderColor: "#A10808" }}
              _focus={{ borderColor: "#A10808" }}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password" color="#A10808" fontWeight="bold">
              Senha
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              bg="white"
              borderColor="#A10808"
              _hover={{ borderColor: "#A10808" }}
              _focus={{ borderColor: "#A10808" }}
              size="lg"
            />
          </FormControl>

          <Button
            mt={6}
            bg="#A10808"
            color="white"
            _hover={{ bg: "#E5E5E5", color: "#A10808" }}
            w="full"
            size="lg"
            rounded="md"
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
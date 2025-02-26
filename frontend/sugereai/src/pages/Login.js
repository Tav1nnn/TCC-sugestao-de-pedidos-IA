import React from 'react';
import { Box, Input, Button, Image, VStack, Text, Flex } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

const Login = () => {
  return (
    <Box
      h="100vh"
      display="grid"
      gridTemplateColumns= "1fr 1fr"
      gridTemplateRows="1fr"
      justifyContent="center"
      //alignItems="center"
      bgColor="rgb(255,255,255)"
    >
      <Flex
        bg='#A10808'
        paddingBottom={8}
        paddingRight={20}
        paddingLeft={8}
        paddingTop={8}
        display={"grid"}
        gridTemplateColumns="1fr"
        justifyContent={"center"}
        alignItems={"center"}
        w="full"
        h="full"
        textAlign="center"
        borderTopRightRadius={200}
        borderBottomRightRadius={200}
      >
        <Box>
          <Text fontSize={40} color="white" fontWeight="bold" mt={4} m={2}>
            Olá, seja bem vindo ao SugereAI!
          </Text>
          <Text m={2}>
            AI(Artificial Intelligence) que entende sua fome e sugere o que você ama.
          </Text>
          <Button
              mt={2}
              bg="#A10808"
              color="white"
              _hover={{ bg: "#E5E5E5", color: "#A10808" }}
              w="max-content"
              size="lg"
              rounded="md"
              border={"2px solid white"}
            >
              Fale conosco!
          </Button>
        </Box>
      </Flex>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}>
        <Box
          //bg='rgb(237,216,196, 0.3)'
          p={20}
          rounded="lg"
          //boxShadow="lg"
          //maxW="400px"
          w="full"
          textAlign="center"
          justifyContent={"center"}
        >
          <Text fontSize="4xl" mt={4} fontWeight="bold" color="#000000">
            Login
          </Text>
          <VStack spacing={4} mt={6} alignItems="stretch">
            <FormControl>
              {/* <FormLabel htmlFor="email" color="#A10808" fontWeight="bold">
                Email
              </FormLabel> */}
              <Input
                id="email"
                type="email"
                placeholder="Usuário"
                bg="#E5E5E5"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#A10808" }}
                _focus={{ borderColor: "#A10808" }}
                size="lg"
                mb={2}
              />
            </FormControl>

            <FormControl w= {'full'}>
              {/* <FormLabel htmlFor="password" color="#A10808" fontWeight="bold">
                Senha
              </FormLabel> */}
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                bg="#E5E5E5"
                borderColor="#E5E5E5"
                w= {'full'}
                mt={2}
                mb={2}
                _hover={{ borderColor: "#A10808" }}
                _focus={{ borderColor: "#A10808" }}
                size="lg"
              />
            </FormControl>
            <Text fontSize={'sm'} fontWeight={"semibold"} color="#000000">
              Esqueceu sua senha?
            </Text>
            <Button
              mt={2}
              bg="#A10808"
              color="white"
              _hover={{ bg: "#E5E5E5", color: "#A10808" }}
              w="full"
              rounded="md"
              size="lg"
            >
              Entrar
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
import React from 'react';
import '../styles/Login.css';
import { Button, Input, VStack } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/form-control';

function Login() {
  return (
    <div className="box-geral">
      <div className="box-fale-conosco">
        <div className="content">
          <h1>Olá, seja bem-vindo ao SugereAI!</h1>
          <p>AI (Artificial Intelligence) que entende sua fome e sugere o que você ama.</p>
          <Button
                      mt={2}
                      bg="#A10808"
                      color="white"
                      _hover={{ bg: "#E5E5E5", color: "#A10808" }}
                      w="max-content"
                      size="lg"
                      rounded="md"
                      border={"2px solid white"}
                      p = {4}
                    >
                      Fale conosco!
         </Button>
        </div>
      </div>

      <div className="box-login">
        <div className="form-box">
          <h2>Login</h2>
          <VStack spacing={4} mt={6} alignItems="stretch">
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="Usuário"
                bg="#E5E5E5"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#A10808" }}
                _focus={{ borderColor: "#A10808" }}
                size="lg"
                p = {4}
                mb={2}
              />
            </FormControl>

            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                bg="#E5E5E5"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#A10808" }}
                _focus={{ borderColor: "#A10808" }}
                size="lg"
                p = {4}
                mb={2}
              />
            </FormControl>

            <p className="senha-esquecida">Esqueceu sua senha?</p>
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
        </div>
      </div>
    </div>
  );
}

export default Login;

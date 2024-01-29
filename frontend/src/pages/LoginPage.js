import { Center, Box, VStack } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Card from "../components/form/card";
import SubCard from "../components/form/sub-card";
import LoginForm from "../components/form/login-form";
import { useTranslation } from "react-i18next";


function Login() {
  const { t } = useTranslation();

  return (
    <VStack h="100vh">
      <Box alignSelf="start">
        <Navbar />
      </Box>
      <Center flexGrow={1} p={[4, 4, 0]} mt={[4, 8, 16]}>
        <Card>
          <SubCard
            textHoverColor="text-blue"
            bgColor="bg-primary"
            route="/signup"
            question={t("form.loginMessage")}
            btnText="Zarejestruj się"
          />
          <LoginForm />
        </Card>
      </Center>
    </VStack>
  );
}

export default Login;

import { VStack, Box, Center } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Card from "../components/form/card";
import SubCard from "../components/form/c-card";
import SignUpForm from "../components/form/signup-form";
import { useTranslation } from "react-i18next";
import Complete_employerForm from "../components/form/complete_employee-form";


function CompleteEmployee() {
  const { t } = useTranslation();
  return (
    <VStack h="100vh">
      <Box alignSelf="start">
        <Navbar />
      </Box>
      <Center flexGrow={1} p={4}>
        <Card>
          <SubCard
            textHoverColor="text-orange"
            bgColor="bg-secondary"
          />
          <Complete_employerForm />
        </Card>
      </Center>
    </VStack>
  );
}

export default CompleteEmployee;
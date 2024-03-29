import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const to_route = useNavigate();
    const navigate = (route) => {
        to_route(route);
    };
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, blue.400, blue.500)"
                backgroundClip="text"
            >
                401
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Unauthorized
            </Text>
            <Text color={"gray.500"} mb={6}>
                Nie masz dostępu do tej strony.
            </Text>

            <Button
                colorScheme="blue"
                bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
                color="white"
                variant="solid"
                onClick={() => navigate("/")}
            >
                Powrót do strony głównej
            </Button>
        </Box>
    );
}

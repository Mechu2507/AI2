import {
    Button,
    Heading,
    HStack,
    Image,
    Text,
    Box,
    Divider,
    SimpleGrid,
    GridItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ props }) => {
    const { t } = useTranslation();
    const to_route = useNavigate();
    const navigate = (route) => {
        to_route(route);
    };

    return (
        <div className="vehicle-card">
            <div className="details">
                <div className="thumb-gallery">
                    <Box bg="gray.400" w="full" h="full">
                        {props.photo ? (
                            <Image
                                className="first"
                                objectFit="cover"
                                h={"215px"}
                                w={"full"}
                                src={props.photo}
                            />
                        ) : (
                            <div align={"center"}>
                                <Text fontSize="lg" color="gray.600" p={4}>Brak zdjęcia</Text>
                            </div>
                        )}
                    </Box>
                </div>

                <Box p={4}>
                    <HStack alignItems="baseline" spacing={"auto"}>
                        <Heading size={"md"} fontWeight="600">
                            {props.firstname} {props.lastname}
                        </Heading>
                        <Heading size={"sm"} fontWeight="600">
                            {props.email}
                        </Heading>
                    </HStack>
                    <HStack py={3}>
                        <Heading size={"md"} fontWeight="600" color="gray.600">
                            {props.expected_salary} zł
                        </Heading>
                        <Text color="gray.400">{t("employeeCard.perMonth")}</Text>
                    </HStack>
                    <Button w="full" onClick={() => navigate(`/employers/${props.id}`)}>
                        {t("employeeCard.moreInfo")}
                    </Button>
                    <Divider borderColor="gray.300" py={3} />

                    <SimpleGrid columns={1} py={4} textAlign="center">
                        <GridItem>
                            <Heading fontWeight="400" color="gray.400" size="xs">
                                {t("employeeCard.expectedJob")}
                            </Heading>
                            <Text fontWeight="500" color="gray.600">
                                {props.expected_job}
                            </Text>
                        </GridItem>
                        <GridItem>
                            <Heading fontWeight="400" color="gray.400" size="xs">
                                {t("employeeCard.education")}
                            </Heading>
                            <Text fontWeight="500" color="gray.600">
                                {props.education}
                            </Text>
                        </GridItem>
                        <GridItem>
                            <Heading fontWeight="400" color="gray.400" size="xs">
                                {t("employeeCard.telephone")}
                            </Heading>
                            <Text fontWeight="500" color="gray.600">
                                {props.telephone}
                            </Text>
                        </GridItem>
                    </SimpleGrid>

                    <Divider borderColor="gray.300" py={0} />
                </Box>
            </div>
        </div>
    );
};

export default EmployeeCard;

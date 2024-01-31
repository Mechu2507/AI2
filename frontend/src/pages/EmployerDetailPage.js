import {
    Center,
    FormLabel,
    Input,
    HStack,
    Box,
    Button,
    Image,
    VStack,
    Text,
    Heading,
    Spacer,
    Stack,
    SimpleGrid,
    GridItem,
    Divider,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/ui/loading-spinner";
import { showToast } from "../components/toast-alert";
import { useTranslation } from "react-i18next";
import Navbar from "../components/navbar/Navbar";
import AvatarMenu from "../components/navbar/avatar-menu";
import NavbarLinks from "../components/navbar/NavbarLinks";

function EmployerDetail() {
    const { t } = useTranslation();

    const navigation = useNavigate();
    const navigate = (route) => navigation(route);
    let params = useParams();
    const toast = useToast();
    const [users, setUsers] = useState({});
    const [isLoading, setLoading] = useState(true);
    const callDate = useRef("");
    const [employers, setEmployer] = useState({});

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/employers/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            .then((response) => {
                setUsers(response.data.data[0]);
                setLoading(false);
            });
    }, [params.id]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/getUserDetails`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((response) => {
                if (response.data && response.data.user) {
                    setEmployer(response.data.user);
                }
            })
            .catch((e) => {
                    console.error(e);
                }
            );
    }, []);


    if (isLoading) return <LoadingSpinner />;

    function createInvite(e){
        e.preventDefault();
        const invite = {
            employers_user_id: employers.id,
            employees_user_id: users.id,
            status_id: 1,
            call_date: callDate.current.value,
        };
        axios
            .post("http://127.0.0.1:8000/api/invites", invite,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            .then((response) => {
                showToast(
                    toast,
                    "Invite created successfully!",
                    "success",
                    "Success"
                );
                navigate("/");
            })
            .catch((error) => {
                showToast(toast, "Creating a invite failed", "error", "Error");
                console.error("Error creating invite:", error);
            });
    }

    function saveForLater(e){
        e.preventDefault();

        const saved = {
            employers_user_id: employers.id,
            employees_user_id: users.id,
        };
        axios
            .post("http://127.0.0.1:8000/api/saved", saved,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            .then((response) => {
                showToast(
                    toast,
                    "Saved successfully!",
                    "success",
                    "Success"
                );
                navigate("/");
            })
            .catch((error) => {
                showToast(toast, "Saving failed", "error", "Error");
                console.error("Error saving:", error);
            });
    }

    return (
        <>
            <Navbar
                links={<NavbarLinks />}
                buttons={<AvatarMenu />}
            />
            <Spacer h={"15vh"} />
            <Center h={"100vh"} m={["5%", "10%", "12%", "13%", "0%"]}>
                <Stack
                    direction={{ base: "column", lg: "row" }}
                    boxShadow="2xl"
                    h={"auto"}
                    w={"80%"}
                    borderRadius="15px"
                    overflow={"hidden"}
                >
                    <Box w={{ base: "100%", lg: "50%" }}>
                        <Image src={users.photo} objectFit="cover" h={"full"}></Image>
                    </Box>
                    <Box w={{ base: "100%", lg: "50%" }} p={"5%"} bg={"white"} h={"full"}>
                        <VStack alignItems={"center"} spacing={"3"}>
                            <Heading fontWeight={"500"}>{users.firstname} {users.lastname}</Heading>

                            <SimpleGrid w={"full"} columns={1} py={3} textAlign="center">
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.email")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.email}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.viewNumber")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.view_number}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.telephone")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.telephone}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Button onClick={saveForLater} w={"full"}>
                                        {t("profile.saveForLater")}
                                    </Button>
                                </GridItem>
                            </SimpleGrid>

                            <Divider borderColor="gray.300" py={1} />
                            <SimpleGrid w={"full"} columns={1} py={3} textAlign="center">
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.experience")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.experience}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.education")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.education}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.skills")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.skills}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.languages")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.languages}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.successes")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.successes}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.expectedJob")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.expected_job}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.interests")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.interests}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.portfolio")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.portfolio}
                                    </Text>
                                </GridItem>
                                <GridItem>
                                    <Heading fontWeight="500" color="gray.400" size="xs">
                                        {t("profile.expectedSalary")}
                                    </Heading>
                                        <Heading size={"md"} fontWeight="600" color="gray.600">
                                            {users.expected_salary} zł {t("employeeCard.perMonth")}
                                        </Heading>
                                </GridItem>

                            </SimpleGrid>
                            <Divider borderColor="gray.300" py={0} />

                            <FormLabel fontWeight="600" color="gray.600">
                                {t("profile.callDate")}
                            </FormLabel>
                            <Input
                                type={"date"}
                                ref={callDate}
                            />

                            <HStack w={"full"} justify={"space-between"}>

                            </HStack>
                            <Button onClick={createInvite} w={"full"}>
                                {t("profile.inviteToInterview")}
                            </Button>
                        </VStack>
                    </Box>
                </Stack>
            </Center>
        </>
    );
}

export default EmployerDetail;

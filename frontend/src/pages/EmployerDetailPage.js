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
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";

function EmployerDetail() {
    const { t } = useTranslation();

    const navigation = useNavigate();
    const navigate = (route) => navigation(route);
    let params = useParams();
    const toast = useToast();
    const [car, setCar] = useState({});
    const [users, setUsers] = useState({});
    const [isLoading, setLoading] = useState(true);

    const rentalDate = useRef("");
    const returnDate = useRef("");
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/employers/${params.id}`)
            .then((response) => {
                setUsers(response.data.data[0]);
                setLoading(false);
            });
    }, [params.id]);

    // useEffect(() => {
    //     calculatePrice();
    // }, []);

    // const calculatePrice = () => {
    //     const rental_date = Date.parse(rentalDate.current.value);
    //     const return_date = Date.parse(returnDate.current.value);
    //     const now = new Date().getTime();
    //
    //     const rentDuration = return_date - rental_date;
    //     if (rentalDate.current.value && returnDate.current.value) {
    //         if (rental_date < now || return_date < now) {
    //             setTotalPrice(0);
    //         } else if (rentDuration <= 0) {
    //             setTotalPrice(0);
    //         } else {
    //             const price = (rentDuration / (1000 * 60 * 60 * 24)) * car.price;
    //             setTotalPrice(price);
    //         }
    //     }
    // };
    //
    // const handleRentalDateChange = () => {
    //     calculatePrice();
    // };
    //
    // const handleReturnDateChange = () => {
    //     calculatePrice();
    // };

    if (isLoading) return <LoadingSpinner />;

    function createInvite(e){

    }

    // function rentACar(e) {
    //     e.preventDefault();
    //
    //     const rental_date = Date.parse(rentalDate.current.value);
    //     const return_date = Date.parse(returnDate.current.value);
    //     const now = new Date().getTime();
    //     const rentDuration = return_date - rental_date;
    //
    //     if (rental_date < now || return_date < now) {
    //         console.log("Please select a valid rental and return dates.");
    //     } else if (rentDuration <= 0) {
    //         console.log("You can rent for 1 day at least.");
    //     } else {
    //         const price = (rentDuration / (1000 * 60 * 60 * 24)) * car.price;
    //
    //         const rent = {
    //             rental_date: rentalDate.current.value,
    //             return_date: returnDate.current.value,
    //             price: price,
    //             user_id: localStorage.getItem("id"),
    //             car_id: params.id,
    //         };
    //         console.log(rent);
    //         if (rentalDate.current.value != "" && returnDate.current.value != "") {
    //             axios
    //                 .post("http://127.0.0.1:8000/api/rents", rent)
    //                 .then((response) => {
    //                     showToast(
    //                         toast,
    //                         "Rent created successfully!",
    //                         "success",
    //                         "Success"
    //                     );
    //                     navigate("/employers");
    //                 })
    //                 .catch((error) => {
    //                     showToast(toast, "Creating a rent failed", "error", "Error");
    //                     console.error("Error creating rent:", error);
    //                 });
    //         }
    //     }
    // }

    return (
        <>
            <Navbar
                sidebarContent={<HomeSidebarContent />}
                links={<NavbarLinks />}
                buttons={<AvatarMenu />}
            />
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
                                        {t("profile.telephone")}
                                    </Heading>
                                    <Text fontWeight="600" color="gray.600">
                                        {users.telephone}
                                    </Text>
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

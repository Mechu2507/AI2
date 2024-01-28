import {
    Box,
    Container,
    HStack,
    TableContainer,
    Thead,
    Table,
    Tr,
    Th,
    Td,
    Tbody,
    VStack,
    Heading,
    Spacer,
    Divider,
    Text,
} from "@chakra-ui/react";
import ProfileDrawer from "../components/ui/profile-drawer";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import AvatarMenu from "../components/navbar/avatar-menu";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function EmployerProfile() {
    const { t } = useTranslation();
    const user_id = localStorage.getItem("id");
    const [rents, setRents] = useState([]);
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/users/${user_id}/invites`)
            .then((response) => {
                setInvites(response.data.data);
            });
    }, []);

    return (
        <>
            <Navbar
                sidebarContent={<HomeSidebarContent />}
                links={<NavbarLinks />}
                buttons={<AvatarMenu />}
            />
            <Container h="100vh" maxW="100vw" py={20}>
                <VStack>
                    <Box w={"90%"}>
                        <HStack>
                            <Heading size={["lg", "xl"]}>{t("profile.heading")}</Heading>
                            <Spacer />
                            <ProfileDrawer />
                        </HStack>
                        <Divider my={5} />

                        <TableContainer>
                            <Table variant="striped" size={["md", "md", "lg"]}>
                                <Thead>
                                    <Tr>
                                        <Th>{t("profile.name")}</Th>
                                        <Th>{t("profile.expectedJob")}</Th>
                                        <Th>{t("profile.telephone")}</Th>
                                        <Th>{t("profile.email")}</Th>
                                        <Th>{t("profile.expectedSalary")}</Th>
                                        <Th>{t("profile.callDate2")}</Th>
                                        <Th>{t("profile.status")}</Th>
                                    </Tr>
                                </Thead>
                                {invites.length === 0 ? (
                                    <Tbody>
                                        <Tr>
                                            <Td colSpan={7}>
                                                <Text textAlign="center">{t("profile.noData")}</Text>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                ) : (
                                    <Tbody>
                                        {invites.map((invite) => (
                                            <Tr key={invite.id}>
                                                <Td>{invite.firstname} {invite.lastname}</Td>
                                                <Td>{invite.expected_job}</Td>
                                                <Td>{invite.telephone}</Td>
                                                <Td>{invite.email}</Td>
                                                <Td>{invite.expected_salary}</Td>
                                                <Td>{invite.call_date}</Td>
                                                <Td>{invite.status}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                )}
                            </Table>
                        </TableContainer>
                    </Box>
                </VStack>
            </Container>
        </>
    );
}

export default EmployerProfile;

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
    Text, Button, Link, SimpleGrid,
} from "@chakra-ui/react";
import ProfileDrawer from "../components/ui/profile-drawer";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import AvatarMenu from "../components/navbar/avatar-menu";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer";
import EmployeeCard from "../components/ui/employee-card";
import ReactPaginate from "react-paginate";

function EmployerProfile() {
    const { t } = useTranslation();
    const user_id = localStorage.getItem("id");
    const [rents, setRents] = useState([]);
    const [invites, setInvites] = useState([]);
    const [archives, setArchives] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const updateInviteStatus = (inviteid, statusId) => {
        axios
            .put(`http://127.0.0.1:8000/api/invites/${inviteid}/update-status`, {status_id: statusId})
            .then((response) => {
                    console.log(response, t("profile.inviteStatusUpdated"));
                    window.location.reload();
                })
            .catch((error) => {
                    console.log(error, t("profile.inviteStatusNotUpdated"));
            });


    }

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/users/${user_id}/invites`)
            .then((response) => {
                setInvites(response.data.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/users/${user_id}/archives`)
            .then((response) => {
                setArchives(response.data.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/forlater/${user_id}`)
            .then((response) => {
                setUsers(response.data.data);
            });
    }, []);

    const PER_PAGE = 3;

    const offset = currentPage * PER_PAGE;

    const currentPageData = users
        .slice(offset, offset + PER_PAGE)
        .map((user) => <EmployeeCard key={user.id} props={user} />);

    const pageCount = Math.ceil(users.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

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
                                        <Th>{t("profile.action")}</Th>
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
                                                <Td>
                                                    <Link href={`/employers/${invite.user_id}`}>
                                                        {invite.firstname} {invite.lastname}
                                                    </Link>
                                                </Td>
                                                <Td>{invite.expected_job}</Td>
                                                <Td>{invite.telephone}</Td>
                                                <Td>{invite.email}</Td>
                                                <Td>{invite.expected_salary}</Td>
                                                <Td>{invite.call_date}</Td>
                                                <Td>{invite.status}</Td>
                                                <Td>
                                                    <VStack>
                                                        <Button colorScheme="blue" size="sm" onClick={() => updateInviteStatus(invite.id, 2)}>
                                                            {t("profile.completed")}
                                                        </Button>
                                                        <Button colorScheme="blue" size="sm" onClick={() => updateInviteStatus(invite.id, 3)}>
                                                            {t("profile.canceled")}
                                                        </Button>
                                                    </VStack>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                )}
                            </Table>
                        </TableContainer>
                    </Box>
                        <Spacer /><Spacer />
                    <Box w={"90%"}>
                        <HStack>
                            <Heading size={["lg", "xl"]}>{t("profile.forLater")}</Heading>
                            <Spacer />
                        </HStack>
                        <Divider my={5} />

                        <VStack>
                            <SimpleGrid
                                columns={[1, 1, 2, 2, 3]}
                                rowGap={6}
                                columnGap={8}
                                py={10}
                            >
                                {currentPageData}
                            </SimpleGrid>
                            <ReactPaginate
                                previousLabel={"Poprzednia"}
                                nextLabel={"Następna"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination__link"}
                                nextLinkClassName={"pagination__link"}
                                disabledClassName={"pagination__link--disabled"}
                                activeClassName={"pagination__link--active"}
                            />
                        </VStack>
                    </Box>
                        <Spacer /><Spacer />
                    <Box w={"90%"}>
                        <HStack>
                            <Heading size={["lg", "xl"]}>{t("profile.archives")}</Heading>
                            <Spacer />
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
                                {archives.length === 0 ? (
                                    <Tbody>
                                        <Tr>
                                            <Td colSpan={7}>
                                                <Text textAlign="center">{t("profile.emptyArchive")}</Text>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                ) : (
                                    <Tbody>
                                        {archives.map((archive) => (
                                            <Tr key={archive.id}>
                                                <Td>{archive.firstname} {archive.lastname}</Td>
                                                <Td>{archive.expected_job}</Td>
                                                <Td>{archive.telephone}</Td>
                                                <Td>{archive.email}</Td>
                                                <Td>{archive.expected_salary}</Td>
                                                <Td>{archive.call_date}</Td>
                                                <Td>{archive.status}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                )}
                            </Table>
                        </TableContainer>
                    </Box>
                </VStack>
                <Spacer h={"15vh"} />
            </Container>
        </>
    );
}

export default EmployerProfile;

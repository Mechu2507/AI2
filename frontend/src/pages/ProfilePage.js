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
import ProfileDrawer from "../components/ui/profile-drawer-employe";
import NavbarLinks from "../components/navbar/NavbarLinks";
import AvatarMenu from "../components/navbar/avatar-menu";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EmployeeCard from "../components/ui/employee-card";


function Profile() {
  const { t } = useTranslation();
  const user_id = localStorage.getItem("id");
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
  const PER_PAGE = 3;
  const offset = currentPage * PER_PAGE;
  const currentPageData = users
        .slice(offset, offset + PER_PAGE)
        .map((user) => <EmployeeCard key={user.id} props={user} />);
  return (
    <>
      <Navbar

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
                                        <Th>{t("Nazwa Firmy")}</Th>
                                        <Th>{t("profile.telephone")}</Th>
                                        <Th>{t("profile.email")}</Th>
                                        <Th>{t("profile.callDate2")}</Th>
                                        <Th>{t("profile.status")}</Th>
                                        <Th>{t("profile.action")}</Th>
                                    </Tr>
                                </Thead>
                                {invites.length === 0 ? (
                                    <Tbody>
                                        
                                    <Tr>
                                        <Td>
                                            <Link href={``}>
                                            {t("Microsoft")}
                                            </Link>
                                        </Td>
                                        <Td>{t("+48100222000")}</Td>
                                        <Td>{t("microsoft@gmail.com")}</Td>
                                        <Td>{t("31.01.2024")}</Td>
                                        <Td>{t("Oczekuje")}</Td>
                                        <Td>
                                            
                                        </Td>
                                    </Tr>
                                
                            </Tbody>
                                ) : (
                                    
                                    <Tbody>
                                    <Tr>
                                        <Td colSpan={7}>
                                            <Text textAlign="center">{t("profile.noData")}</Text>
                                        </Td>
                                    </Tr>
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

export default Profile;

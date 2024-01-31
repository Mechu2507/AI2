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
  const [invites, setInvites] = useState([]);
  const [user_id, setUser_id] = useState(0);
  const [isForbidden, setIsForbidden] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/getUserDetails`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if (response.data && response.data.user) {
                    setUser_id(response.data.user.id);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    useEffect(() => {
        if (user_id) {
            axios
                .get(`http://127.0.0.1:8000/api/getInvites/${user_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setInvites(response.data.data);
                    setIsForbidden(false);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        setIsForbidden(true);
                    }
                });
                }
    }, [user_id]);

  const handlesortByStatus = () => {
      const sortedData = [...invites].sort((a, b) => {
          if (sortOrder === "asc") {
              return a.status.localeCompare(b.status);
          } else {
              return b.status.localeCompare(a.status);
          }
      });
        setInvites(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

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
              <Heading size={["lg", "xl"]}>{t("profile.invites")}</Heading>
              <Spacer />
              <ProfileDrawer />
            </HStack>
            <Divider my={5} />

            <TableContainer>
                <Table variant="striped" size={["md", "md", "lg"]}>
                    <Thead>
                        <Tr>
                            <Th>{t("profile.company_name")}</Th>
                            <Th>{t("profile.company_address")}</Th>
                            <Th>{t("profile.callDate2")}</Th>
                            <Th onClick={handlesortByStatus} cursor="pointer">
                                {t("profile.status")} {sortOrder === "asc" ? "↓" : "↑"}
                            </Th>
                        </Tr>
                    </Thead>
                    {invites.length === 0 ? (
                        <Tbody>
                            {isForbidden ? (
                                <Tr>
                                    <Td colSpan={4}>
                                        <Text align="center">
                                            {t("profile.forbidden")}
                                        </Text>
                                    </Td>
                                </Tr>
                            ) : (
                                <Tr>
                                    <Td colSpan={4}>
                                        <Text align="center">
                                            {t("profile.no_invites")}
                                        </Text>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    ) : (
                        <Tbody>
                            {invites.map((invite) => (
                                <Tr key={invite.id}>
                                    <Td>{invite.company_name}</Td>
                                    <Td>{invite.company_address}</Td>
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

export default Profile;

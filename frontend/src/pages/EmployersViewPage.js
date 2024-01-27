import { Box, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer";
import LoadingSpinner from "../components/ui/loading-spinner";
import SearchInput from "../components/search";
import AvatarMenu from "../components/navbar/avatar-menu";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import SearchContext from "../SearchContext";
import EmployeeCard from "../components/ui/employee-card";

function EmployersView() {
    const { searchResults, setSearchResults } = useContext(SearchContext);
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/employers").then((response) => {
            setUsers(response.data.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Navbar
                    sidebarContent={<HomeSidebarContent />}
                    links={<NavbarLinks />}
                    buttons={
                        <>
                            <SearchInput type={"user"} />
                            <AvatarMenu />
                        </>
                    }
                />

                <VStack>
                    <SimpleGrid
                        columns={[1, 1, 2, 2, 3]}
                        rowGap={6}
                        columnGap={8}
                        py={10}
                    >
                        {searchResults && searchResults.length > 0
                            ? searchResults.map((users) => (
                                <GridItem key={users.id} colSpan={1}>
                                    <EmployeeCard props={users} />
                                </GridItem>
                            ))
                            : users.map((user) => (
                                <GridItem key={user.id} colSpan={1}>
                                    <EmployeeCard props={user} />
                                </GridItem>
                            ))}
                    </SimpleGrid>
                </VStack>
            </Box>
            <Footer />
        </Box>
    );
}

export default EmployersView;
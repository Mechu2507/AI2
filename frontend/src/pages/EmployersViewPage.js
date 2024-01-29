import { Box, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer";
import LoadingSpinner from "../components/ui/loading-spinner";
import SearchInput from "../components/search";
import AvatarMenu from "../components/navbar/avatar-menu";
import NavbarLinks from "../components/navbar/NavbarLinks";
import SearchContext from "../SearchContext";
import EmployeeCard from "../components/ui/employee-card";
import ReactPaginate from 'react-paginate';

function EmployersView() {
    const { searchResults, setSearchResults } = useContext(SearchContext);
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/employers").then((response) => {
            setUsers(response.data.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingSpinner />;

    const PER_PAGE = 6;

    const offset = currentPage * PER_PAGE;

    const currentPageData = users
        .slice(offset, offset + PER_PAGE)
        .map((user) => <EmployeeCard key={user.id} props={user} />);

    const pageCount = Math.ceil(users.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Navbar

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
            <Footer />
        </Box>
    );
}

export default EmployersView;
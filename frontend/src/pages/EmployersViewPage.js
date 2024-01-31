import { Box, GridItem, SimpleGrid, VStack, Input } from "@chakra-ui/react";
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
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/employers",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
            setUsers(response.data.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingSpinner />;

    const PER_PAGE = 6;

    const offset = currentPage * PER_PAGE;

    const filteredUsers = users.filter(user => {
        const numericMinSalary = minSalary ? Number(minSalary) : 0;
        const numericMaxSalary = maxSalary ? Number(maxSalary) : Infinity;
        return user.expected_salary >= numericMinSalary && user.expected_salary <= numericMaxSalary;
    });

    const currentPageData = filteredUsers
        .slice(offset, offset + PER_PAGE)
        .map((user) => <EmployeeCard key={user.id} props={user} />);

    const pageCount = Math.ceil(filteredUsers.length / PER_PAGE);

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
                            <Input
                    placeholder="Wpisz minimalną płacę"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    style={{maxWidth: "250px"}}
                />
                <Input
                    placeholder="Wpisz maksymalną płacę"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    style={{maxWidth: "250px"}}
                />
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
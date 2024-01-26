import { Box, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import CarCard from "../components/ui/car-card";
import Footer from "../components/footer";
import LoadingSpinner from "../components/ui/loading-spinner";
import SearchInput from "../components/search";
import AvatarMenu from "../components/navbar/avatar-menu";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import SearchContext from "../SearchContext";

function CheckEmployees() {
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/employers").then((response) => {
      setEmployees(response.data.data);
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
              <SearchInput type={"employees"} />
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
              ? searchResults.map((employee) => (
                  <GridItem key={employee.id} colSpan={1}>
                    <CarCard props={employee} />
                  </GridItem>
                ))
              : employees.map((employee) => (
                  <GridItem key={employee.id} colSpan={1}>
                    <CarCard props={employee} />
                  </GridItem>
                ))}
          </SimpleGrid>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
}

export default CheckEmployees;

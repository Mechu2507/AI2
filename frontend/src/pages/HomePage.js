import { Container, Flex, VStack } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import NavbarLoginButtons from "../components/navbar/login-buttons";
import HomePageText from "../components/home/home-page-text";
import HomePageButton from "../components/home/home-page-button";
import HomePageImage from "../components/home/home-page-image";
import Footer from "../components/footer";
import ClientSpeak from "../components/home/client-speak";
import AvatarMenu from "../components/navbar/avatar-menu";
import useAuthentication from "../useAuthentication";
import WhyChooseUs from "../components/home/why-choose-us";
import AboutClients from "../components/home/about-clients";
import NavbarLinks from "../components/navbar/NavbarLinks";
import { useEffect, useState } from "react";

function Home() {
  const [showNavbarContent, setShowNavbarContent] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbarContent(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <Navbar

        links={<NavbarLinks />}
        buttons={
          showNavbarContent &&
          (isLoggedIn ? <AvatarMenu /> : <NavbarLoginButtons />)
        }
      />
      <Container overflow="hidden" maxWidth="1720px" px={[12, 8, 8]}>
        <Flex h="100vh" rowGap={4} direction={"row"}>
          <VStack
            alignItems="start"
            justifyContent="center"
            spacing={7}
            px={[0, 12, 4, 8]}
            h="full"
          >
            <HomePageText />
            <HomePageButton />
          </VStack>
          <HomePageImage />
        </Flex>
      </Container>
      <AboutClients />
      <WhyChooseUs />
      <ClientSpeak />
      <Footer />
    </>
  );
}

export default Home;

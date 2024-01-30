import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  useToast, useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {showToast} from "../toast-alert";

function ProfileDrawer() {
  const { t } = useTranslation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    telephone: "",
    company_name: "",
    company_address: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    axios.get("http://127.0.0.1:8000/api/getUserDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data && response.data.user) {
        setFormData({
          firstname: response.data.user.firstname || "",
          lastname: response.data.user.lastname || "",
          telephone: response.data.user.telephone || "",
          company_name: response.data.user.company_name || "",
          company_address: response.data.user.company_address || "",
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching user data", error);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    axios.put(`http://127.0.0.1:8000/api/user/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      showToast(
        toast,
        "Dane zostały pomyślnie zaktualizowane.",
        "success",
        "Success"
      );

      setFormData({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        telephone: response.data.telephone,
        company_name: response.data.company_name,
        company_address: response.data.company_address,
      });

      onClose();
    })
    .catch((error) => {
      console.error("Error updating profile", error);
    });
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon color={"white"} />}
        colorScheme="telegram"
        onClick={onOpen}
      >
        {t("profile.editProfile")}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">
            {t("profile.modifyProfile")}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="firstname">
                  {t("profile.firstname")}
                </FormLabel>
                <Input
                  ref={firstField}
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="lastname">
                  {t("profile.lastname")}
                </FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="telephone">
                  {t("profile.phoneNumber")}
                </FormLabel>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </Box>
               <Box>
                <FormLabel htmlFor="company_name">
                  {t("profile.company_name")}
                </FormLabel>
                <Input
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </Box>
               <Box>
                <FormLabel htmlFor="company_address">
                  {t("profile.company_address")}
                </FormLabel>
                <Input
                  id="company_address"
                  name="company_address"
                  value={formData.company_address}
                  onChange={handleChange}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              {t("profile.cancel")}
            </Button>
            <Button colorScheme="green" px={7} onClick={handleSubmit}>
              {t("profile.save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProfileDrawer;

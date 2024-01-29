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
  const user_id = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    telephone: "",
    education: "",
    experience: "",
    interests: "",
    skills: "",
    languages: "",
    portfolio: "",
    successes: "",
    expected_salary: "",
    expected_job: "",
    photo: "",


  });

  useEffect(() => {
    setFormData({
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
      telephone: localStorage.getItem("telephone"),
      education: localStorage.getItem("education"),
      experience: localStorage.getItem("experience"),
      interests: localStorage.getItem("interests"),
      skills: localStorage.getItem("skills"),
      languages: localStorage.getItem("languages"),
      portfolio: localStorage.getItem("portfolio"),
      successes: localStorage.getItem("successes"),
      expected_salary: localStorage.getItem("expected_salary"),
      expected_job: localStorage.getItem("expected_job"),
      photo: localStorage.getItem("photo"),


    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .put(`http://127.0.0.1:8000/api/user/${user_id}`, formData)
      .then((response) => {
        const updatedUser = response.data.data;
        if (updatedUser) {
          showToast(
            toast,
            "Dane zostały pomyślnie zaktualizowane.",
            "success",
            "Success"
          );
          localStorage.setItem("firstname", updatedUser.firstname);
          localStorage.setItem("lastname", updatedUser.lastname);
          localStorage.setItem("telephone", updatedUser.telephone);
          localStorage.setItem("education", updatedUser.education);
          localStorage.setItem("experience", updatedUser.experience);
          localStorage.setItem("interests", updatedUser.interests);
          localStorage.setItem("skills", updatedUser.skills);
          localStorage.setItem("languages", updatedUser.languages);
          localStorage.setItem("portfolio", updatedUser.portfolio);
          localStorage.setItem("successes", updatedUser.successes);
          localStorage.setItem("expected_salary", updatedUser.expected_salary);
          localStorage.setItem("expected_job", updatedUser.expected_job);
          localStorage.setItem("photo", updatedUser.photo);


          onClose();
        }
      })
      .catch((error) => {
        console.log(error);
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
                <FormLabel htmlFor="education">
                  {t("profile.education")}
                </FormLabel>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="experience">
                  {t("profile.experience")}
                </FormLabel>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="interests">
                  {t("profile.interests")}
                </FormLabel>
                <Input
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="skills">
                  {t("profile.skills")}
                </FormLabel>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="languages">
                  {t("profile.languages")}
                </FormLabel>
                <Input
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="portfolio">
                  {t("profile.portfolio")}
                </FormLabel>
                <Input
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="successes">
                  {t("profile.successes")}
                </FormLabel>
                <Input
                  id="successes"
                  name="successes"
                  value={formData.successes}
                  onChange={handleChange}
                />
              </Box>

            <Box>
                <FormLabel htmlFor="expected_salary">
                  {t("profile.expectedSalary")}
                </FormLabel>
                <Input
                  id="expected_salary"
                  name="expected_salary"
                  value={formData.expected_salary}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="expected_job">
                  {t("profile.expectedJob")}
                </FormLabel>
                <Input
                  id="expected_job"
                  name="expected_job"
                  value={formData.expected_job}
                  onChange={handleChange}
                />
              </Box>

               <Box>
                <FormLabel htmlFor="photo">
                  {t("profile.photo")}
                </FormLabel>
                <Input
                  id="photo"
                  name="photo"
                  value={formData.photo}
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

import {
  Box,
  Text,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";

const AvatarMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', role_id: '' });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/getUserDetails",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
            if (response.data && response.data.user) {
                setUser(response.data.user);
            }
        })
        .catch((e) => {
            console.error(e);
        });
    }, []);

    const handleLogout = (e) => {
      e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/auth/logout", {
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                localStorage.removeItem("token");
                navigate("/login");
            })
            .catch((e) => {
                console.error(e);
            });
    }

  const [currentLanguage, setCurrentLanguage] = useState("pl");

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={
                  "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                }
              />
            </MenuButton>
            <MenuList>
              <Box mt={4} textAlign="center">
                <Text fontWeight="bold">{user.firstname} {user.lastname}</Text>
                <Text fontSize="sm" color={"gray"}>
                  {user.email}
                </Text>
              </Box>
              <MenuDivider />

              <MenuItem onClick={() => navigate( user.role_id === 2 ? "/employer_profile" : "/profile")}>
  {t("menuList.profile")}
</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>{t("menuList.logout")}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AvatarMenu;

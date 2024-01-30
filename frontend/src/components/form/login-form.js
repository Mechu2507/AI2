import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import FormButton from "./form-button";
import FormInput from "./form-input";
import useAuthentication from "../../useAuthentication";
import { showToast } from "../toast-alert";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const { setLoggedIn } = useAuthentication();
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  const toast = useToast();
  const email = useRef();
  const password = useRef();
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', role_id: '' });

  function Login(e) {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/auth/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((response) => {

        localStorage.setItem("token", response.data.token);

          setLoggedIn(true);

          axios
              .get("http://127.0.0.1:8000/api/getUserDetails",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
              .then((response) => {
                  if (response.data && response.data.user) {
                      setUser(response.data.user);

                      if (response.data.user.role_id === 1) {
                          navigate("/profile");
                      } else {
                          navigate("/employers");
                      }
                  }
              } )
              .catch((e) => {
                  console.error(e);
              });
  })
        .catch((e) => {
            console.error(e);
        });
    }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
      <form onSubmit={Login}>
        <FormInput name={t("form.email")} type="email" refe={email} />
        <FormInput name={t("form.password")} type="password" refe={password} />
        <FormButton bgColor="btn-primary" btnText={t("form.signIn")} />
      </form>
    </div>
  );
};

export default LoginForm;

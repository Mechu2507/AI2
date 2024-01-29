import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
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

  function Login(e) {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: email.current.value,
      })
      .then((response) => {
        const { id, firstname, lastname, telephone, email, role_id, company_name, company_address, education, experience, interests, skills, languages, portfolio, successes, expected_salary, expected_job, photo } =
          response.data.data;

        console.log(response.data.data);
        const verifyPassword = bcrypt.compareSync(
          password.current.value,
          response.data.pass
        );
        if (verifyPassword) {
          showToast(
            toast,
            "Zostałeś pomyślnie zalogowany.",
            "success",
            "Success"
          );

          localStorage.setItem("id", id);
          localStorage.setItem("firstname", firstname);
          localStorage.setItem("lastname", lastname);
          localStorage.setItem("telephone", telephone);
          localStorage.setItem("email", email);
          localStorage.setItem("role_id", role_id);
          localStorage.setItem("company_name",company_name);
          localStorage.setItem("company_address",company_address);
          localStorage.setItem("education",education);
          localStorage.setItem("experience",experience);
          localStorage.setItem("interests",interests);
          localStorage.setItem("skills",skills);
          localStorage.setItem("languages",languages);
          localStorage.setItem("portfolio",portfolio);
          localStorage.setItem("successes",successes);
          localStorage.setItem("expected_salary",expected_salary);
          localStorage.setItem("expected_job",expected_job);
          localStorage.setItem("photo",photo);

          setLoggedIn(true);

         

          if (role_id === 1) {
            navigate("/profile");
          } else if (role_id === 2) {
            navigate("/employers");
          }

        } else if (!verifyPassword) {
          showToast(toast, "Błędne hasło. Spróbuj ponownie.");
        }
      })
      .catch((e) => {
        console.log(`>>>>>>>>>>>>>>${e}`);
        showToast(toast, e.response);
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

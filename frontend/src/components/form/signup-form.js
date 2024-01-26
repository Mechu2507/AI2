import { useRef , useState, useEffect} from "react";
import {Select, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import FormButton from "./form-button";
import FormInput from "./form-input";
import { showToast } from "../toast-alert";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  const toast = useToast();
  const firstname = useRef();
  const lastname = useRef();
  const telephone = useRef();
  const email = useRef();
  const password = useRef();
  const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/roles")
        .then((response) => {
          setUserRoles(response.data);
        }).catch((error) => {
      console.log(error);
    } );
  } , []);

  function createUserAcccount(e) {
    e.preventDefault();

    if (!password.current.value.match(passwordRegEx))
      return showToast(
        toast,
        "Password must be minimum 8 characters, at least 1 letter and 1 number."
      );

    const hashedPassword = bcrypt.hashSync(password.current.value);
    axios
      .post("http://127.0.0.1:8000/api/signup", {
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        telephone: telephone.current.value,
        email: email.current.value,
        password: hashedPassword,
        userRoles: userRoles.current.value,
      })
      .then(() => {
        showToast(toast, "Account created successfully.", "success", "Success");
        navigate("/login");
      })
      .catch((error) => showToast(toast, error.response.data.message));
  }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
      <form onSubmit={createUserAcccount}>
        <FormInput name={t("form.firstname")} type="text" refe={firstname} />
        <FormInput name={t("form.lastname")} type="text" refe={lastname} />
        <FormInput name={t("form.telephone")} type="tel" refe={telephone} />
        <FormInput name={t("form.email")} type="email" refe={email} />
        <FormInput name={t("form.password")} type="password" refe={password} />
        <label htmlFor="userRoles">{t("form.userRoles")}</label><br/>
        <Select name={t("form.userRoles")} type="select" ref={userRoles}>
          {userRoles.map(role => (
              <option key={role.id} value={role.id}>{role.role}</option>
          ))}
        </Select>
        <FormButton bgColor="btn-secondary" btnText={t("form.createAccount")} />
      </form>
    </div>
  );
};

export default SignUpForm;

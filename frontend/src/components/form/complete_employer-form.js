import { useRef, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormButton from "./form-button";
import FormInput from "./form-input";
import { showToast } from "../toast-alert";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  const toast = useToast();
  const cname = useRef();
  const caddress = useRef();

  function createUserAcccount(e) {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/signup", {
        cname: cname.current.value,
        caddress: caddress.current.value,

      })
      .then(() => {
        showToast(toast, "Account information updated successfully.", "success", "Success");
        navigate("/"); // Przekierowanie na stronę główną po utworzeniu konta
      })
      .catch((error) => showToast(toast, error.response.data.message));
  }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
      <form onSubmit={createUserAcccount}>
        <FormInput name={t("form.cname")} type="text" refe={cname} />
        <FormInput name={t("form.caddress")} type="text" refe={caddress} />

        <FormButton bgColor="btn-secondary" btnText={t("form.completeAccount")} />
      </form>
    </div>
  );
};

export default SignUpForm;

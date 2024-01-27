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
  const job = useRef();
  const education = useRef();
  const experience = useRef();
  const interests = useRef();
  const skills = useRef();
  const languages = useRef();
  const portfolio = useRef();
  const successes = useRef();
  const expectedSalary = useRef();
  const photo = useRef();

  function createUserAcccount(e) {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/signup", {
        job: job.current.value,
        education: education.current.value,
        experience: experience.current.value,
        interests: interests.current.value,
        skills: skills.current.value,
        languages: languages.current.value,
        portfolio: portfolio.current.value,
        successes: successes.current.value,
        expected_salary: expectedSalary.current.value,
        photo: photo.current.value,
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
        <FormInput name={t("form.job")} type="text" refe={job} />
        <FormInput name={t("form.education")} type="text" refe={education} />
        <FormInput name={t("form.experience")} type="text" refe={experience} />
        <FormInput name={t("form.interests")} type="text" refe={interests} />
        <FormInput name={t("form.skills")} type="text" refe={skills} />
        <FormInput name={t("form.languages")} type="text" refe={languages} />
        <FormInput name={t("form.portfolio")} type="text" refe={portfolio} />
        <FormInput name={t("form.successes")} type="text" refe={successes} />
        <FormInput name={t("form.expectedSalary")} type="number" refe={expectedSalary} />
        <FormInput name={t("form.photo")} type="text" refe={photo} />
        <FormButton bgColor="btn-secondary" btnText={t("form.completeAccount")} />
      </form>
    </div>
  );
};

export default SignUpForm;

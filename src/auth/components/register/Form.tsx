import { useState } from "react";
import { RegisterForm } from "./steps/RegisterForm";
import { Spinner } from "@cloudscape-design/components";
import styles from "../../theme/auth.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../hook/useAuth";

export const Form = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = (formData: any) => {
    setLoading(true);
    register(formData);
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };
  return (
    <>
      {loading && (
        <div className={styles.loader}>
          <p>Redireccionando</p>
          <Spinner size="large" variant="normal" />
        </div>
      )}
      {!loading && <RegisterForm onSubmitForm={handleSubmitForm} />}
    </>
  );
};

import {
  SpaceBetween,
  Header,
  Container,
  Input,
  Button,
  FormField,
  Form,
  Checkbox,
  StatusIndicator,
  Grid,
} from "@cloudscape-design/components";
import { Link } from "react-router";

import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../hook/useAuth";
const initialForm = {
  email: "adm@adm.cl",
  password: "1234",
  checked: false,
};
export const LoginForm = () => {
  const { authData, login, getUser } = useAuth();
  const [loadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const handleOnSubmit = async () => {
    event?.preventDefault();
    setLoadingForm(true);
    const result = await getUser(formData.email);

    if (!result) {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado!",
        text: "Credenciales invalidas.",
        showConfirmButton: true,
        confirmButtonText: "Regresar",
        confirmButtonColor: "red",
        didClose: () => {
          setLoadingForm(false);
        },
      });
      return;
    }

    if (result) {
      setTimeout(() => {
        Swal.fire({
          timer: 2000,
          icon: "success",
          title: "Acceso concedido!",
          showConfirmButton: true,
          confirmButtonText: "Continuar",
          confirmButtonColor: "green",
          didClose: () => {
            setLoadingForm(false);
            login(true, {
              id: crypto.randomUUID(),
              email: formData.email,
              pwd: formData.password,
            });
            localStorage.setItem(
              "session",
              JSON.stringify({
                idSession: crypto.randomUUID(),
                isLogged: true,
                user: {
                  id: crypto.randomUUID(),
                  email: formData.email,
                  pwd: formData.password,
                },
              })
            );
          },
        });
      }, 1500);
    }
  };

  return (
    <Container header={<Header variant="h2">Autenticacion</Header>}>
      <form onSubmit={handleOnSubmit}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs" alignItems="center">
              <Link to="/register">
                <Button formAction="none" variant="link">
                  Registrar
                </Button>
              </Link>
              <Button
                variant="primary"
                iconName="arrow-right"
                formAction="submit"
                loading={loadingForm}
              >
                Ingresar
              </Button>
              {authData.isLogged && <StatusIndicator />}
            </SpaceBetween>
          }
        >
          <Grid
            gridDefinition={[
              { colspan: { default: 8 }, push: { default: 2 } },
              { colspan: { default: 8 }, push: { default: 2 } },
              { colspan: { default: 12 }, push: { default: 1 } },
            ]}
          >
            <FormField label="Correo electronico">
              <Input
                autoComplete={false}
                value={formData.email}
                name="username"
                type="text"
                onChange={(event) =>
                  setFormData({ ...formData, email: event.detail.value })
                }
                warning={formData.email !== "" && formData.email.length <= 4}
                placeholder="MiCorreo123@correo.cl  "
                disabled={authData.isLogged || loadingForm ? true : false}
              />
            </FormField>

            <FormField label="Contraseña">
              <Input
                autoComplete={false}
                placeholder="***********"
                value={formData.password}
                name="password"
                type={formData.checked ? "text" : "password"}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    password: event.detail.value,
                  })
                }
                warning={
                  formData.password !== "" && formData.password.length <= 1
                }
                disabled={authData.isLogged || loadingForm ? true : false}
              />
            </FormField>

            <FormField>
              <SpaceBetween direction="horizontal" alignItems="center" size="s">
                <Checkbox
                  onChange={({ detail }) =>
                    setFormData({ ...formData, checked: detail.checked })
                  }
                  checked={formData.checked}
                >
                  Mostrar contraseña
                </Checkbox>
                <Link to={"/restore"}>
                  <Button variant="link">¿Olvidaste tu contraseña?</Button>
                </Link>
              </SpaceBetween>
            </FormField>
          </Grid>
        </Form>
      </form>
    </Container>
  );
};

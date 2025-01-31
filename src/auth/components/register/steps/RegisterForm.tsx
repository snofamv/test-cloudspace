import {
  Button,
  Checkbox,
  Container,
  Form,
  FormField,
  Header,
  Input,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const initialForm = {
  email: "",
  password: "",
  rePassword: "",
  checked: false,
};
interface Props {
  onSubmitForm: (status: any) => void;
}
export const RegisterForm = ({ onSubmitForm }: Props) => {
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const handleOnSubmit = () => {
    event?.preventDefault();
    setLoadingForm(true);
    setTimeout(() => {
      onSubmitForm(formData);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        html: "<p>Te has registrado exitosamente!</p>",
        confirmButtonText: "Continuar",
        timer: 2500,
        didClose: () => {
          setLoadingForm(false);
        },
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <SpaceBetween size="m">
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                formAction="none"
                variant="normal"
                onClick={() => setFormData(initialForm)}
                iconName="refresh"
                disabled={loadingForm}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                iconName="arrow-right"
                formAction="submit"
                loading={loadingForm}
                disabled={loadingForm}
              >
                Continue
              </Button>
            </SpaceBetween>
          }
        >
          <Container
            header={<Header variant="h2">Formulario de registro</Header>}
          >
            <SpaceBetween direction="vertical" size="l">
              <FormField label="Email address">
                <Input
                  disabled={loadingForm}
                  value={formData.email}
                  name="email"
                  type="text"
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.detail.value })
                  }
                  warning={formData.email !== "" && formData.email.length <= 4}
                  placeholder="Email address here"
                />
              </FormField>
              <FormField label="Password">
                <Input
                  disabled={loadingForm}
                  placeholder="Password here"
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
                    formData.password !== "" && formData.password.length <= 2
                  }
                  invalid={formData.password !== formData.rePassword}
                />
              </FormField>
              <FormField label="Repeat Password">
                <Input
                  disabled={loadingForm}
                  placeholder="Repeat Password here"
                  value={formData.rePassword}
                  name="rePassword"
                  type={formData.checked ? "text" : "password"}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      rePassword: event.detail.value,
                    })
                  }
                  warning={
                    formData.rePassword !== "" &&
                    formData.rePassword.length <= 2
                  }
                  invalid={formData.password !== formData.rePassword}
                />
              </FormField>

              <FormField>
                <Checkbox
                  onChange={({ detail }) =>
                    setFormData({ ...formData, checked: detail.checked })
                  }
                  checked={formData.checked}
                >
                  Show password
                </Checkbox>
              </FormField>
            </SpaceBetween>
          </Container>
        </Form>
        <Button
          disabled={loadingForm}
          variant="normal"
          iconName="angle-left"
          fullWidth
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </SpaceBetween>
    </form>
  );
};

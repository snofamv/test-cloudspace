import {
  Button,
  Container,
  DateInput,
  Form,
  FormField,
  Grid,
  Header,
  Input,
  RadioGroup,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import Swal from "sweetalert2";
import { setPersona } from "../../helper/fetch";
import { getDVRut } from "../../utils/rutValidator";
const initialForm = {
  direccion: {
    direccion: "",
    tipo: "",
    numero: "",
    region: "",
    comuna: "",
    provincia: "",
    pais: "",
  },
  telefono: "",
  rut: "",
  dv: "",
  nombres: "",
  paterno: "",
  materno: "",
  fecnac: "",
  genero: "",
};
const initialRutBody = { body: "", dv: "0" };

export const PersonalForm = () => {
  const [rut, setRut] = useState(initialRutBody);
  const [loadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const handleOnSubmit = async () => {
    event?.preventDefault();
    setLoadingForm(true);
    const result = await setPersona(formData);
    if (!result || !result.id) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar!",
        html: "<p>No se puede registrar a la persona!</p>",
        confirmButtonText: "Volver",
        didClose: () => {
          handleClearForm();
        },
      });
    }
    if (result && result.id) {
      setLoadingForm(false);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        html: "<p>Te has registrado exitosamente!</p>",
        confirmButtonText: "Continuar",
        didClose: () => {
          handleClearForm();
        },
      });
    }
  };
  const handleClearForm = () => {
    setFormData(initialForm);
    setRut({ body: "", dv: "" });
  };
  const handleChangeRut = (e: any) => {
    const { value } = e.detail;
    const rutBody = value.replace(/\D/g, "");
    if (rutBody.length === 9) return;
    const dv = rutBody.length > 0 ? getDVRut(rutBody) : "";
    setRut({ body: rutBody, dv });
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              variant="normal"
              onClick={handleClearForm}
              iconName="refresh"
            >
              Limpiar
            </Button>
            <Button
              variant="primary"
              iconName="arrow-right"
              formAction="submit"
              loading={loadingForm}
            >
              Registrar
            </Button>
          </SpaceBetween>
        }
      >
        <Container
          header={<Header variant="h2">Formulario de registro</Header>}
        >
          <Grid
            gridDefinition={[
              { colspan: { default: 11 } },
              { colspan: { default: 1 }, pull: { default: 3 } },
              { colspan: { default: 12 } },
              { colspan: { default: 6 } },
              { colspan: { default: 6 } },
              { colspan: { default: 6 } },
              { colspan: { default: 6 }, push: { xxs: 1 } },
              { colspan: { default: 6 } },
              { colspan: { default: 6 } },
              { colspan: { default: 8 } },
              { colspan: { default: 4 } },
              { colspan: { default: 6 }, push: { default: 1 } },
              { colspan: { default: 5 }, push: { default: 1 } },
            ]}
          >
            <FormField label="RUT" constraintText="Maximo 8 digitos numericos">
              <Input
                value={rut.body}
                type="text"
                onChange={(event) => {
                  handleChangeRut(event);
                }}
                warning={rut.body !== "" && rut.body.length < 7}
                placeholder="Rut aqui"
              />
            </FormField>
            <FormField label="DV" constraintText="Maximo 1 digito">
              <Input
                value={rut.dv}
                type="text"
                onChange={(event) =>
                  setFormData({ ...formData, dv: event.detail.value })
                }
                warning={formData.dv !== "" && formData.dv.length === 0}
                placeholder="0"
                disabled
              />
            </FormField>
            <FormField
              label="Nombre completo"
              constraintText="Maximo 32 caracteres"
            >
              <Input
                value={formData.nombres}
                type="text"
                onChange={(event) =>
                  setFormData({ ...formData, nombres: event.detail.value })
                }
                warning={
                  formData.nombres !== "" && formData.nombres.length <= 4
                }
                placeholder="Nombres aqui"
              />
            </FormField>
            <FormField
              label="Apellido paterno"
              constraintText="Maximo 32 caracteres"
            >
              <Input
                value={formData.paterno}
                type="text"
                onChange={(event) =>
                  setFormData({ ...formData, paterno: event.detail.value })
                }
                warning={
                  formData.paterno !== "" && formData.paterno.length <= 4
                }
                placeholder="Apellido paterno"
              />
            </FormField>
            <FormField
              label="Apellido materno"
              constraintText="Maximo 32 caracteres"
            >
              <Input
                value={formData.materno}
                type="text"
                onChange={(event) =>
                  setFormData({ ...formData, materno: event.detail.value })
                }
                warning={
                  formData.materno !== "" && formData.materno.length <= 4
                }
                placeholder="Apellido materno"
              />
            </FormField>
            <FormField
              label="Fecha nacimiento"
              constraintText="Utilize formato año/mes/dia."
            >
              <DateInput
                onChange={({ detail }) =>
                  setFormData({ ...formData, fecnac: detail.value })
                }
                value={formData.fecnac}
                placeholder="Año/Mes/Dia"
              />
            </FormField>
            <FormField label="Genero" constraintText="Seleccionar un genero">
              <RadioGroup
                onChange={({ detail }) =>
                  setFormData({ ...formData, genero: detail.value })
                }
                value={formData.genero}
                items={[
                  { value: "F", label: "Femenino" },
                  { value: "M", label: "Masculino" },
                ]}
              />
            </FormField>
            <FormField
              label="Nacionalidad"
              constraintText="Seleccionar un pais"
            >
              <Select
                selectedOption={
                  formData.direccion.pais || ({ label: "Seleccione" } as {})
                }
                onChange={({ detail }) =>
                  setFormData({
                    ...formData,
                    direccion: {
                      ...formData.direccion,
                      pais: detail.selectedOption as any,
                    },
                  })
                }
                options={[
                  { label: "Chile", value: "CL" },
                  { label: "Argentina", value: "ARG" },
                  { label: "Peru", value: "PE" },
                  { label: "Bolivia", value: "BO" },
                  { label: "Brazil", value: "BR" },
                  { label: "Uruguay", value: "URU" },
                  { label: "Paraguay", value: "PA" },
                ]}
              />
            </FormField>

            <FormField label="Telefono contacto">
              <Input
                placeholder="912345678"
                value={formData.telefono}
                type="text"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    telefono: event.detail.value,
                  })
                }
                warning={
                  formData.telefono !== "" && formData.telefono.length <= 2
                }
                invalid={formData.telefono !== formData.telefono}
              />
            </FormField>
            <FormField
              label="Direccion completa"
              constraintText="Debe ser una direccion valida"
            >
              <Input
                value={formData.direccion.direccion}
                type="text"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    direccion: {
                      ...formData.direccion,
                      direccion: event.detail.value,
                    },
                  })
                }
                warning={
                  formData.direccion.direccion !== "" &&
                  formData.direccion.direccion.length <= 4
                }
                placeholder="Tu direccion aquí"
              />
            </FormField>
            <FormField label="Numero #" constraintText="Numero de domicilio">
              <Input
                value={formData.direccion.numero}
                type="text"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    direccion: {
                      ...formData.direccion,
                      numero: event.detail.value,
                    },
                  })
                }
                warning={
                  formData.direccion.numero !== "" &&
                  formData.direccion.numero.length <= 1
                }
                placeholder="Numero"
              />
            </FormField>
            <FormField label="Tipo casa" constraintText="Seleccionar un tipo">
              <RadioGroup
                onChange={({ detail }) =>
                  setFormData({
                    ...formData,
                    direccion: { ...formData.direccion, tipo: detail.value },
                  })
                }
                value={formData.direccion.tipo}
                items={[
                  { value: "C", label: "Casa" },
                  { value: "DB", label: "Depto / Block" },
                ]}
              />
            </FormField>

            <FormField label="Region" constraintText="Seleccionar una region">
              <Select
                selectedOption={
                  formData.direccion.region || ({ label: "Seleccione" } as {})
                }
                onChange={({ detail }) =>
                  setFormData({
                    ...formData,
                    direccion: {
                      ...formData.direccion,
                      region: detail.selectedOption as any,
                    },
                  })
                }
                options={[
                  { label: "Iquique", value: "1" },
                  { label: "Valparaiso", value: "6" },
                ]}
              />
            </FormField>
          </Grid>
        </Container>
      </Form>
    </form>
  );
};

import { useParams } from "react-router";
import { DashboardLayout } from "../layout/DashboardLayout";
import { useEffect, useState } from "react";
import { usePersonas } from "../hooks/usePersonas";
import { ActualizarForm } from "../components/actualizar/ActualizarForm";

export const ActualizarPage = () => {
  const [formData, setFormData] = useState<any | null>(null); // 🔹 Inicializa en null
  const { findById } = usePersonas();
  const { id } = useParams();

  useEffect(() => {
    const getPersona = async () => {
      if (!id) return; // 🔹 Evita errores si id es undefined o null

      try {
        const persona = await findById(id);
        if (persona) {
          setFormData(persona[0]); // 🔹 Solo actualiza si persona es válida
        }
      } catch (error) {
        console.error("Error obteniendo la persona:", error);
      }
    };

    getPersona();
  }, [id]);

  if (!formData) {
    return <p>Cargando datos...</p>; // 🔹 Muestra un mensaje mientras carga
  }

  return (
    <DashboardLayout>
      <ActualizarForm data={formData} />
    </DashboardLayout>
  );
};

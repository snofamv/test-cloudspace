import axios from "axios";

export const getPersonas = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/personas`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) return [];
      console.error(`Error get personas: ${error.response.statusText}`);
    } else {
      console.error("Error en getPersonas:", error.message);
    }
    return null;
  }
};
export const getPersona = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/personas?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) return [];
      console.error(`Error get personas: ${error.response.statusText}`);
    } else {
      console.error("Error en getPersonas:", error.message);
    }
    return null;
  }
};

export const setPersona = async (persona: any) => {
  try {
    delete persona.checked;
    const response = await fetch("http://localhost:3000/personas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(persona),
    });

    if (!response.ok) {
      throw new Error(`Error en el registro: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en setUser:", error);
    return null;
  }
};
export const updatePersona = async (id: string, data: any) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/personas/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error al actualizar la persona:",
      error.response?.data || error.message
    );
    return null;
  }
};

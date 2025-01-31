import axios from "axios";

export const getUser = async (email: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/usuarios`, {
      params: { email }, // Axios maneja los parámetros de query automáticamente
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Axios ya maneja `response.ok`, no necesitas verificarlo
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) return [];
      console.error(`Error get usuario by email: ${error.response.statusText}`);
    } else {
      console.error("Error en getUser:", error.message);
    }
    return null;
  }
};

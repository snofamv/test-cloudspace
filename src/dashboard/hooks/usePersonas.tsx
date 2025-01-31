import { useEffect, useState } from "react";
import { getPersona, getPersonas } from "../helper/fetch";

export const usePersonas = () => {
  const [personas, setPersonas] = useState<any>([]);
  const findById = async (id: string) => {
    const result = await getPersona(id);
    return await result;
  };

  useEffect(() => {
    const fetchPersonas = async () => {
      const results = await getPersonas();
      setPersonas(results);
    };
    fetchPersonas();
  }, []);

  return { personas, findById };
};

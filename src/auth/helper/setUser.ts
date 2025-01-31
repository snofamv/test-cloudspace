export const setUser = async (user: any) => {
  try {
    delete user.checked;
    delete user.rePassword;
    const response = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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


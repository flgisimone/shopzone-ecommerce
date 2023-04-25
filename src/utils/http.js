const url = "https://api.escuelajs.co/api/v1"

  const POST = async (res, name, email, password) => {

    const response = await fetch(`${url}/${res}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now() + Math.random(),
        name: `${name}`,
        role: "customer",
        email: `${email}`,
        password: `${password}`,
        avatar: "https://picsum.photos/200"
      }),
    });
    
    const data = await response.json();

    return data;
  };

  export { POST };
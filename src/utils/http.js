/**
 * API: "https://api.escuelajs.co/api/v1"
 
 * This code defines an asynchronous POST function that sends a POST request to an API at the URL with the parameters: 
 * - name
 * - email
 * - password
 
 * The POST request contains a JSON body that includes a randomly generated ID, name, role, email, password, and an avatar URL.
 */

const url = "https://api.escuelajs.co/api/v1";

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
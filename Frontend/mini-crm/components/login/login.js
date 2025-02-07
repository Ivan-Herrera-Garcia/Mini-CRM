import React from "react";



export default function Login() {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [sesion, setSesion] = React.useState(null);

    async function handleLogin() {
      console.log(username, password);
      try {
          const response = await fetch("https://mini-crm-dev.deno.dev/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  username,
                  password,
              }),
          });
  
          const data = await response.json();
          console.log(data);
  
          if (response.ok && data) {
              // Crear un objeto con los datos
              const userData = {
                  userId: data.data._id,
                  name: data.data.name,
                  phoneNumber: data.data.phoneNumber
              };
              console.log(userData)
              // Convertir el objeto en string JSON y codificarlo en Base64
              const encodedData = btoa(JSON.stringify(userData));
              console.log(encodedData)
              // Guardar la cookie con la información en Base64
              document.cookie = `crmuserdata=${encodedData}; max-age=${72 * 60 * 60}; path=/; Secure`;
  
              console.log("Cookie guardada correctamente.");
          } else {
              console.error("Error en el login:", data.message);
          }
      } catch (error) {
          console.error(error);
      }
  }
  
    return (
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={(e) => 
            handleLogin()
          }>
          Login
        </button>
      </div>
    );
}
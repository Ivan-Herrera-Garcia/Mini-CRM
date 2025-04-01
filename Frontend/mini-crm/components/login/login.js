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
                name: password, 
            };
            
            // Convertir a JSON y codificar en Base64
            const encodedData = btoa(JSON.stringify(userData));
            
            // Guardar la cookie correctamente
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
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Iniciar Sesión</h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mb-3 text-blue-800"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mb-3 text-black"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Ingresar
                </button>
            </div>
        </div>
    );
}
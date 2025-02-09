import { useState } from 'react';

export default function NuevoUsuario(asesores) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [asesor, setAsesor] = useState(asesores.length > 0 ? asesores.asesores[0]._id : "");

    const handleNuevoUsuario = async () => {
        console.log(asesor);
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: asesor,
                    username: username,
                    password: password
                })
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                console.log(data);
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            { asesores.asesores.length === 0 ?  <p>No hay asesores disponibles</p> :
            <>
            <h1>Nuevo Usuario</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                    <label className="block text-sm font-medium text-gray-700">Asesor</label>
                    <select value={asesor} onChange={(e) => setAsesor(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                        {asesores.asesores.map((asesor) => (
                            <option key={asesor._id} value={asesor._id}>{asesor.name}</option>
                        ))}
                    </select>

                </div>
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleNuevoUsuario()}>Crear Usuario</button>
                        </>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://mini-crm-dev.deno.dev/user`);
    const users = await res.json();

    console.log(users);

    const asesor = await fetch(`https://mini-crm-dev.deno.dev/asesor`);
    const asesores = await asesor.text();
    const fixedJson = `[${asesores.replace(/}{/g, "},{")}]`;

    const listaAsesores = JSON.parse(fixedJson);
    console.log(listaAsesores);

    const asesorSinUser = listaAsesores.filter((asesor) => {
        return !users.find((user) => user.idAsesor === asesor._id);
    });

    console.log(asesorSinUser);




    return {
        props: {asesores: asesorSinUser},
    }
}
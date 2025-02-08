import { useState } from "react";


export default function EditarAsesor(asesor) {
    const [name, setName] = useState(asesor.asesor.name);
    const [phoneNumber, setPhoneNumber] = useState(asesor.asesor.phoneNumber);
    const [error, setError] = useState(null);

    const handleEditar = async () => {
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/editasesor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: asesor.asesor._id,
                    name: name,
                    phoneNumber: phoneNumber
                })
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            <h1>Asesores</h1>
            <h2>Editar</h2>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditar()}>Editar Asesor</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const idAsesor = context.params.params;
    const response = await fetch("https://mini-crm-dev.deno.dev/asesor/"+idAsesor, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const asesor = await response.json();
    console.log(asesor);
    
    return { props: { asesor: asesor[0] } };
}
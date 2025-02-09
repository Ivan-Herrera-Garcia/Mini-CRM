import { useState } from "react";

export default function NuevoAsesor() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleCrear = async () => {
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/addasesor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phoneNumber: phoneNumber
                })
            });
            const data = await res.json();
            if (data && data != null) {
                window.location.href = "/Asesores";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
        }
    }
    return (
        <div>
            <h2>Nuevo Asesor</h2>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCrear()}>Crear Asesor</button>
        </div>
    );
}
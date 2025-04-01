import { useState } from "react";
import Link from "next/link";

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
            if (data) {
                window.location.href = "/Asesores";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 text-center text-lg font-bold">
                <h1>Editar Asesor</h1>
            </header>

            {/* Contenido principal */}
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-md p-6">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                        type="text" 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    
                    <label className="block text-sm font-medium text-gray-700 mt-3">Teléfono</label>
                    <input 
                        type="text" 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    
                    <button 
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={handleEditar}
                    >
                        Guardar cambios
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center p-4 text-sm">
                <p>© {new Date().getFullYear()} Mini CRM - Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps(context) {
    const idAsesor = context.params.params;
    const response = await fetch(`https://mini-crm-dev.deno.dev/asesor/${idAsesor}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    
    const asesor = await response.json();
    
    return { props: { asesor: asesor[0] } };
}
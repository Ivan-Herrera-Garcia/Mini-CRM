import { useState } from "react";
import Link from "next/link";

export default function NuevoAsesor() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);

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
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Realty Manager</h1>
                    
                    {/* Icono de menú para móviles */}
                    <button className="lg:hidden text-white text-2xl">☰</button>
                    
                    {/* Menú Desktop */}
                    <div className="hidden lg:flex space-x-6">
                        <Link href="/" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Home</a>
                        </Link>
                        <Link href="/Inmuebles" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Inmuebles</a>
                        </Link>
                        <Link href="/Seguimientos" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Seguimientos</a>
                        </Link>
                        <Link href="/Configuracion" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Configuracion</a>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6">Nuevo Asesor</h2>
                    
                    {/* Formulario de Nuevo Asesor */}
                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input 
                                type="text" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />

                            <label className="block text-sm font-medium text-gray-700 mt-4">Teléfono</label>
                            <input 
                                type="text" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>
                        
                        {/* Mostrar error si existe */}
                        {error && <div className="mt-4 text-red-500">{error}</div>}

                        <button 
                            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={handleCrear}
                        >
                            Crear Asesor
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 mt-6 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

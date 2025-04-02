import Link from "next/link";
import { useState } from "react";

export default function Asesores({ asesores }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Mini CRM</h1>
                    
                    {/* Icono de menú para móviles */}
                    <button 
                        className="lg:hidden text-white text-2xl" 
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>

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
                        <Link href="/Configuración" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Configuración</a>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Modal para el menú en móviles */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-3/4">
                        <button onClick={toggleMenu} className="text-2xl text-gray-700">X</button>
                        <div className="flex flex-col space-y-4">
                            <Link href="/" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Home</a>
                            </Link>
                            <Link href="/Inmuebles" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Inmuebles</a>
                            </Link>
                            <Link href="/Seguimientos" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Seguimientos</a>
                            </Link>
                            <Link href="/Configuración" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-5xl">
                    <div className="text-center mb-6">
                        <Link href="/Asesores/Nuevo" legacyBehavior>
                            <a className="bg-blue-500 text-white p-2 rounded-lg shadow-sm">Nuevo asesor</a>
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Lista de Asesores</h2>
                    <ul className="space-y-4">
                        {asesores.map((asesor) => (
                            <li key={asesor._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                                <h3 className="text-xl font-semibold text-blue-600">{asesor.name}</h3>
                                <p className="text-gray-700">{asesor.phoneNumber}</p>
                                <div className="mt-2">
                                    <Link href={`/Asesores/${asesor._id}`} legacyBehavior>
                                        <a className="text-blue-500 hover:underline mr-4">Ver ficha</a>
                                    </Link>
                                    <Link href={`/Asesores/Editar/${asesor._id}`} legacyBehavior>
                                        <a className="text-blue-500 hover:underline">Editar</a>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 mt-6 shadow-md">
                <p className="text-sm">© 2025 Mini CRM. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch("https://mini-crm-dev.deno.dev/asesor", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`; // Arreglar formato

    const data = JSON.parse(fixedJson);
    
    return { props: { asesores: data } };
}

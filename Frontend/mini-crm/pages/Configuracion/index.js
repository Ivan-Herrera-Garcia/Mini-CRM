import Link from "next/link";
import { useState } from "react";
import config from "../../postcss.config.mjs";

export default function Asesores({ configuracion }) {
    const temas = {
        "azul-blanco": "#003366|#FFFFFF",
        "negro-gris": "#000000|#AAAAAA",
        "blanco-negro": "#FFFFFF|#000000",
        "negro-blanco" : "#000000|#FFFFFF",
        "gris-blanco": "#444444|#FFFFFF",
        "azuloscuro-celeste": "#1B3B6F|#A1E0FF"
    };
    
    function obtenerClave(colorPrimario, colorSecundario) {
        const valorBuscado = `${colorPrimario}|${colorSecundario}`;
    
        return Object.keys(temas).find(key => temas[key] === valorBuscado) || null;
    }

    const [tema, setTema] = useState(obtenerClave(configuracion[0].primaryColor, configuracion[0].secondaryColor));
    const [titulo, setTitulo] = useState(configuracion[0].title);
    const [descripcion, setDescripcion] = useState(configuracion[0].descripcion);
    const [imagen, setImagen] = useState(configuracion[0].urlPicture);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Realty Manager</h1>
                    
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
                        <Link href="/Login" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Cuentas</a>
                        </Link>
                        <Link href="/Configuracion" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Configuracion</a>
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
                            <Link href="/Login" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Cuentas</a>
                            </Link>
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Configuracion</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}


            {/* Main content */}
            <main className="flex-grow p-6" style={{ padding: "20px", textAlign: "start" }}>
                {/* Sección de Tema de Colores */}
                <section style={{ marginBottom: "20px" }}>
                    <h2>Seleccionar Tema</h2>
                    <select
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                        style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc" }}
                    >
                        <option value="negro-blanco">Negro y Blanco</option>
                        <option value="azul-blanco">Azul y Blanco</option>
                        <option value="negro-gris">Negro y Gris</option>
                        <option value="blanco-negro">Blanco y Negro</option>
                        <option value="gris-blanco">Gris y Blanco</option>
                        <option value="azuloscuro-celeste">Azul Oscuro y Celeste</option>
                    </select>
                </section>

                {/* Sección de Título */}
                <section style={{ marginBottom: "20px" }}>
                <h2>Título</h2>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ingresa el título"
                    style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc" }}
                />
                </section>

                {/* Sección de Descripción */}
                <section style={{ marginBottom: "20px" }}>
                <h2>Descripción</h2>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Ingresa una descripción"
                    rows="4"
                    style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc" }}
                />
                </section>

                {/* Sección de Imagen */}
                <section style={{ marginBottom: "20px" }}>
                <h2>Imagen del Sitio</h2>
                <input
                    type="file"
                    onChange={(e) => setImagen(URL.createObjectURL(e.target.files[0]))}
                    style={{ padding: "10px", fontSize: "16px", }}
                />
                {imagen && <img src={imagen} alt="Imagen Previa" style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }} />}
                </section>
                <button
                    onClick={async () => {
                        console.log(tema);
                        console.log(temas[tema]);
                        const response = await fetch("https://mini-crm-dev.deno.dev/editconfiguracion", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                _id: configuracion[0]._id,
                                primaryColor: temas[tema].split("|")[0],
                                secondaryColor: temas[tema].split("|")[1],
                                title: titulo,
                                descripcion: descripcion,
                                urlPicture: imagen
                            })
                        });
                        const data = await response.text();
                        if (data && data != null) {
                            window.location.href = "/Configuracion";
                        } else {
                            alert("Error al actualizar la configuración");
                        }
                    }}
                    style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}
                >Actualizar Configuración</button>
            </main>

           
            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch("https://mini-crm-dev.deno.dev/configuracion", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`; // Arreglar formato

    const data = JSON.parse(fixedJson);

    return { props: { configuracion: data } };
}

import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Inmuebles({inmueblesData, config}) {
    const [inmuebles, setInmuebles] = useState(inmueblesData);
    const [error, setError] = useState(null);
    
    function priceFormat(value) {
        // Validar que sea un número válido
        const price = parseFloat(value);
        if (isNaN(price)) return "$0.00"; // Manejar valores inválidos
    
        // Formatear el precio en USD
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        });
    
        return formatter.format(price);
    }

    function operationFormat(value) {
        const operation = value.toLowerCase();
        switch (operation) {
            case "venta":
                return "Venta";
            case "renta":
                return "Renta";
            default:
                return "Desconocido";
        }
    }
    const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
    const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
    const [titulo, setTitulo] = useState(config.title);
    const [descripcion, setDescripcion] = useState(config.descripcion);

    useEffect(() => {
        
        setColorPrimario(config.primaryColor);
        setColorSecundario(config.secondaryColor);
        setTitulo(config.title);
        setDescripcion(config.descripcion);
    }, [config]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            <Head>
                <title>{config.title}</title>
                <meta name="description" content={config.descripcion} />

                <meta name="twitter:site" content="website" />
                <meta name="twitter:title" content={config.title} />
                <meta name="twitter:description" content={config.descripcion} />
                <meta name="twitter:image" content={config.urlPicture} />

                <meta name="title" content={config.title} />  
                <meta name="description" content={config.descripcion} />

                <meta property="og:title" content={config.title} />
                <meta property="og:image" content={config.urlPicture} />
                <meta property="og:description" content={config.descripcion} />
                <meta property="og:type" content="website" />

                {/* <link rel="icon" type="image/png" href="/images/favicon.ico" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/PropiedadesMexico/logo192.svg" /> */}

            </Head>
            {/* Header */}
            <header  style={{backgroundColor: colorPrimario}}  className={`py-4 shadow-md flex justify-between items-center px-6`}>
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">{titulo}</h1>
                    
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
                            <a className="text-lg font-semibold text-white hover:underline">Inicio</a>
                        </Link>
                        <Link href="/Asesores" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Asesores</a>
                        </Link>
                        <Link href="/Configuracion" legacyBehavior>
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
                                <a className="text-lg text-gray-800 hover:underline">Inicio</a>
                            </Link>
                            <Link href="/Asesores" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Asesores</a>
                            </Link>
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-5xl">
                    <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Inmuebles</h2>
                    <Link
                        href="/Inmuebles/Nuevo"
                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                    >
                        + Crear Inmueble
                    </Link>
                    </div>

                    {error && <p className="text-red-600 mb-4">Error: {error}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inmuebles.map((inmueble) => (
                        <div
                        key={inmueble._id}
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                        {/* <img
                            className="rounded-t-2xl w-full h-48 object-cover"
                            src="/docs/images/blog/image-1.jpg"
                            alt="Imagen del inmueble"
                        /> */}
                        <div className="p-5">
                            <h5 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                            {inmueble.title}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {operationFormat(inmueble.operation)}
                            </p>
                            <p className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                            {priceFormat(inmueble.price)}
                            </p>
                            <div className="flex gap-2">
                            <Link
                                href={`/Inmuebles/Editar/${inmueble._id}`}
                                className="flex-1 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300"
                            >
                                Editar
                            </Link>
                            <a
                                href={inmueble.urlInmueble}
                                target="_self"
                                className="flex-1 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300"
                            >
                                Ficha
                                <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </main>

   
              {/* Footer */}
              <footer  style={{backgroundColor: colorPrimario, color: colorSecundario}}  className={`text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch("https://mini-crm-dev.deno.dev/inmuebles", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`;

    const data = JSON.parse(fixedJson);
    console.log(data);
    const responseConfig = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await responseConfig.text();

    return { props: { inmueblesData: data, config: JSON.parse(config) } };
}

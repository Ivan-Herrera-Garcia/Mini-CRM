import { useEffect, useState } from "react";

export default function NuevoInmueble(asesores) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [urlInmueble, setUrlInmueble] = useState("");
    const [price, setPrice] = useState("");
    const [operation, setOperation] = useState("venta");
    const [idAsesor, setIdAsesor] = useState(asesores.asesores[0]._id);

    const handleCrear = async () => {
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/addinmueble`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    price: parseInt(price, 10),
                    operation: operation,
                    idAsesor: idAsesor,
                    urlInmueble: urlInmueble
                })
            });
            const data = await res.json();
            if (data && data != null) {
                window.location.href = "/Inmuebles";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            <h2>Editar Inmueble</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">URL del Inmueble</label>
                            <input type="text" value={urlInmueble} onChange={(e) => setUrlInmueble(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">Precio</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">Operación</label>
                            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                                <option value="venta">Venta</option>
                                <option value="renta">Renta</option>
                            </select>
                            
                            <label className="block text-sm font-medium text-gray-700">Asesor</label>
                            <select value={idAsesor} onChange={(e) => setIdAsesor(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                                {
                                    asesores.asesores.map((asesor) => (
                                        <option key={asesor._id} value={asesor._id}>{asesor.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCrear()}>Crear Inmueble</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch("https://mini-crm-dev.deno.dev/asesor", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`;

    const data = JSON.parse(fixedJson);

    return {
        props: { asesores: data },
    }
}
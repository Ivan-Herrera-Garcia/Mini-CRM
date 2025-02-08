import { useEffect, useState } from "react";

export default function EditarInmueble(inmueble) {

    const [error, setError] = useState(null);
    console.log(inmueble);
    //Para editar
    const [title, setTitle] = useState(inmueble.inmueble.title);
    const [urlInmueble, setUrlInmueble] = useState(inmueble.inmueble.urlInmueble);
    const [price, setPrice] = useState(inmueble.inmueble.price);
    const [operation, setOperation] = useState(inmueble.inmueble.operation);

    const handleEditar = async () => {
        console.log(JSON.stringify({
            id: inmueble.inmueble.id,
            title: title,
            price: parseInt(price, 10),
            operation: operation,
            idAsesor: inmueble.inmueble.idAsesor,
            urlInmueble: urlInmueble
        }));
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/editinmueble`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: inmueble.inmueble.id,
                    title: title,
                    price: parseInt(price, 10),
                    operation: operation,
                    idAsesor: inmueble.inmueble.idAsesor,
                    urlInmueble: urlInmueble
                })
            });
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
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">Operación</label>
                            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                                <option value="venta">Venta</option>
                                <option value="renta">Renta</option>
                            </select>
                        </div>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditar()}>Editar Inmueble</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    console.log(context.params);

    const res = await fetch(`https://mini-crm-dev.deno.dev/inmuebles/${context.params.params}`);
    const inmueble = await res.json();

    return {
        props: { inmueble: inmueble[0] },
    }
}
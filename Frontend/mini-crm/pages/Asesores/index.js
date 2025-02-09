import Link from "next/link";
import { useEffect, useState } from "react";

export default function Asesores(asesores) {
    return (
        <div>
            <h1>Asesores</h1>
            <div>
                <Link href="/Asesores/Nuevo" legacyBehavior>
                    <a className="bg-blue-500 text-white p-2 rounded-lg shadow-sm">Nuevo asesor</a>
                </Link>
            </div>
            <h2>Lista de asesores</h2>
            <ul>
                {asesores.asesores.map((asesor) => (
                    <li key={asesor._id}>
                        <a href={`/Asesores/${asesor._id}`} className="block border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                            <h3>{asesor.name}</h3>
                            <p>{asesor.phoneNumber}</p>
                            <Link href={`/Asesores/${asesor._id}`} legacyBehavior className="text-blue-500">
                                <span>Ver ficha</span>
                            </Link>
                            <Link href={`/Asesores/Editar/${asesor._id}`} legacyBehavior className="text-blue-500">
                                <span>Editar</span>   
                            </Link>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch("https://mini-crm-dev.deno.dev/asesor", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`;

    const data = JSON.parse(fixedJson);
    
    return { props: { asesores: data } };
}


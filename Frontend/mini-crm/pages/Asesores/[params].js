import { useEffect, useState } from "react";

export default function FichaAsesor(asesor) {
    console.log(asesor);
    return (
        <div>
            <h1>Asesores</h1>
            <h2>Ficha</h2>
            <ul>
                <li>
                    <h3>{asesor.asesor.name}</h3>
                    <p>{asesor.asesor.phoneNumber}</p>
                </li>
            </ul>
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


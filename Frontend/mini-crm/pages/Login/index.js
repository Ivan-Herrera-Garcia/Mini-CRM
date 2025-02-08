import React, { useState } from 'react';

export default function Login(users) {
    const [usuarios, setUsuarios] = useState(users.users);
    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario._id}>
                        <p>{usuario.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://mini-crm-dev.deno.dev/user`);
    const users = await res.json();
    return {
        props: {users:users}, 
    }
}
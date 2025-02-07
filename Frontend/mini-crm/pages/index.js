import { useEffect, useState } from "react";
import Login from "../components/login/login";
import Menu from "../components/menu/menu";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Función para obtener la cookie
        function getCookie(name) {
            const cookies = document.cookie.split("; ");
            const cookie = cookies.find(row => row.startsWith(`${name}=`));
            return cookie
        }

        // Verifica si la cookie crmuserdata existe
        const userData = getCookie("crmuserdata");

        if (userData) {
            setIsLoggedIn(true); // Si la cookie existe, actualiza el estado
        }
    }, []);

    return (
        <div>
            {isLoggedIn ? <Menu/> : <Login />}
        </div>
    );
}

  
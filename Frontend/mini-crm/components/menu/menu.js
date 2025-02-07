export default function Menu () {
    const items = [
        { name: "Inmuebles", bgColor: "bg-blue-500" },
        { name: "Asesores", bgColor: "bg-green-500" },
        { name: "Seguimientos", bgColor: "bg-yellow-500" },
        { name: "Configuración", bgColor: "bg-red-500" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-96">
                {items.map((item, index) => (
                    <div key={index} className={`${item.bgColor} text-white p-6 rounded-2xl text-center text-lg font-semibold shadow-lg`}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
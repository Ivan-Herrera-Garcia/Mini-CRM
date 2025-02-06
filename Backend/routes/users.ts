import { hash, compare } from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { Router, Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB


const usersRouter = new Router();
const registroCollection = db.collection("users");
const { getQuery } = helpers;

// Obtener todos los asesores
usersRouter.get("/user", async (context: Context) => {
  const registros = await registroCollection.find();
  const registrosArray = await registros.map((registro: any) => { // Mapear los registros para que no se muestre la contraseña
    const { password, ...rest } = registro;
    return rest;
  });
  context.response.body = registrosArray;
});

usersRouter.get("/user/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    try {
        var registro = await registroCollection.find({ _id: new Bson.ObjectId(id)});
        const registroId = await registro.toArray();
        if (registroId.length != 0) {
          context.response.body = registroId;
        } else {
            context.response.status = 404;
            context.response.body = { message: "Registro no encontrado" };
        }
    }
    catch (error: any) {
            context.response.status = 500;
            context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

usersRouter.post("/adduser", async (context) => {
    try {
        const body = await context.request.body({ type: "json" }).value;
        if (!body || !body.username || !body.password) {
            context.response.status = 400;
            context.response.body = { message: "Faltan datos obligatorios" };
            return;
        }

        const { username, password } = body;

        // Verificar si el usuario ya existe
        const userExists = await registroCollection.findOne({ username });
        if (userExists) {
            context.response.status = 409;
            context.response.body = { message: "El usuario ya existe" };
            return;
        }

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await hash(password);

        // Insertar el usuario en la base de datos
        const insertId = await registroCollection.insertOne({
            username,
            password: hashedPassword,
        });

        context.response.status = 201;
        context.response.body = { message: "Usuario registrado", userId: insertId };
    } catch (error) {
        console.error("Error en /adduser:", error);
        context.response.status = 500;
        context.response.body = { message: "Error en el servidor" };
    }
});

// 📌 Ruta para iniciar sesión
usersRouter.post("/login", async (context) => {
    try {
        const body = await context.request.body({ type: "json" }).value;
        if (!body || !body.username || !body.password) {
            context.response.status = 400;
            context.response.body = { message: "Faltan datos obligatorios" };
            return;
        }

        const { username, password } = body;

        // Buscar el usuario en la base de datos
        const user = await registroCollection.findOne({ username });
        if (!user) {
            context.response.status = 404;
            context.response.body = { message: "Usuario no encontrado" };
            return;
        }

        // Comparar la contraseña ingresada con la almacenada
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            context.response.status = 401;
            context.response.body = { message: "Contraseña incorrecta" };
            return;
        }

        context.response.status = 200;
        context.response.body = { message: "Inicio de sesión exitoso", userId: user._id };
    } catch (error) {
        console.error("Error en /login:", error);
        context.response.status = 500;
        context.response.body = { message: "Error en el servidor" };
    }
});

export default usersRouter;

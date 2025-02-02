import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import asesorRouter from "./asesor.ts";
import seguimientoRouter from "./seguimiento.ts";
import inmuebleRouter from "./inmuebles.ts";

const router = new Router();

router.get("/", (context) => {
  context.response.body = "Bienvenido al API de Proyecto SPAM";
});

// Importa las rutas de asesores
router.use(asesorRouter.routes());
router.use(asesorRouter.allowedMethods());

router.use(seguimientoRouter.routes());
router.use(seguimientoRouter.allowedMethods());

router.use(inmuebleRouter.routes());
router.use(inmuebleRouter.allowedMethods());

export default router;

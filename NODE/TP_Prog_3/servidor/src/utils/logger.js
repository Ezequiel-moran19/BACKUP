import { Log } from "../model/log.model.js";

export async function registrarLog(admin, accion, detalle = null) {

  const adminId = admin?.id ?? null;
  const adminNombre = admin?.nombre ?? "SIN_ADMIN";

  await Log.create({
    adminId,
    adminNombre,
    accion,
    detalle
  });
}

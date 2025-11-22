import { Admin } from "../model/admin.model.js";
import jwt from "jsonwebtoken";
// Middleware para verificar login del admin
export function verificarAdmin(req, res, next) {

  // 1) Leer token desde la cookie
  const token = req.cookies?.token;

  if (!token) {
    // Si NO hay token → no está logueado
    return res.redirect("/admin/login");
  }

  try {
    // 2) Validar token usando la clave secreta
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = data; 
    // 3) Token válido → dejar pasar
    next();

  } catch (err) {
    // Token vencido o manipulado
    return res.redirect("/admin/login");
  }
}

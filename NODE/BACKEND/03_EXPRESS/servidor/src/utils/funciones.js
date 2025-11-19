import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Crear admin por defecto si no existe
export const crearAdmin = async () => {
  const adminExistente = await Admin.findOne({ where: { nombre: "admin" } });

  if (!adminExistente) {
    const hash = await bcrypt.hash("1234", 10);
    await Admin.create({ nombre: "admin", pass: hash });
    console.log("Administrador creado por defecto");
  }
};

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
    jwt.verify(token, process.env.JWT_SECRET);

    // 3) Token válido → dejar pasar
    next();

  } catch (err) {
    // Token vencido o manipulado
    return res.redirect("/admin/login");
  }
}

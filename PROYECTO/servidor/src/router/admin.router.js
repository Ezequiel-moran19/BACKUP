import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/login", (req, res) => {
  res.render("login");
});

adminRouter.post("/login", (req, res) => {
  const { nombre, pass } = req.body;
  if (nombre === "admin" && pass === "1234") {
    return res.redirect("/admin/dashboard");
  }
  return res.redirect("/pages/bienvenida.html");
});

adminRouter.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

export default adminRouter;

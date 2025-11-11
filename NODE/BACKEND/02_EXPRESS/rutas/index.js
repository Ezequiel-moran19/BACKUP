import express from 'express';
import { link } from '../config/link.js';
const router = express.Router();

// Ruta raíz apunta a bienvenida
router.get('/', (req, res) => {
  res.render("bienvenida", { link });
});

router.get('/bienvenida', (req, res) => {
  res.render("bienvenida", { link });
});

export { router };

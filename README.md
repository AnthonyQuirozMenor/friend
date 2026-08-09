# 🌸 Flor de 7 Pétalos Interactiva para tu Amiga

Una experiencia web prémium diseñada con animaciones fluidas, destellos de luz mágicos y 7 pétalos interactivos. Cada pétalo revela una foto y un mensaje especial.

---

## 🚀 ¿Cómo abrir la aplicación?

1. Haz doble clic en el archivo **`run.bat`** o abre directamente el archivo **`index.html`** en cualquier navegador (Google Chrome, Edge, Safari, Firefox).
2. ¡Listo! Funciona de inmediato sin necesidad de instalar programas.

---

## 📸 ¿Cómo personalizar las Fotos y Mensajes?

### 1. Colocar las fotos:
Guarda tus fotos dentro de la carpeta **`foto/`** con estos nombres:
- `foto1.jpg` (para el Pétalo 1)
- `foto2.jpg` (para el Pétalo 2)
- `foto3.jpg` (para el Pétalo 3)
- `foto4.jpg` (para el Pétalo 4)
- `foto5.jpg` (para el Pétalo 5)
- `foto6.jpg` (para el Pétalo 6)
- `foto7.jpg` (para el Pétalo 7)

*(Nota: También puedes usar imágenes en formato `.png` o `.webp`, solo asegúrate de actualizar la extensión en `app.js`).*

---

### 2. Cambiar los mensajes y títulos:
Abre el archivo **`app.js`** con cualquier editor de texto o en este IDE y modifica las líneas dentro de `petalsData` al inicio del archivo:

```javascript
const petalsData = [
  {
    id: 1,
    title: "1. Título del Recuerdo",
    text: "Escribe aquí tu mensaje especial...",
    image: "foto/foto1.jpg"
  },
  // ... así para los 7 pétalos
];
```

---

## ✨ Características Especiales
- **Geometría perfecta de 7 pétalos:** Disposición simétrica radial ($360^\circ / 7$).
- **Fondo de partículas y luciérnagas mágicas:** Canvas con destellos en tiempo real.
- **Efecto de pétalo descubierto:** Cada pétalo cambia de color y marca un destello al ser visitado.
- **Contador y sorpresa final:** Al descubrir los 7 pétalos, se desbloquea una lluvia de destellos y una tarjeta final de felicitación.
- **100% Responsivo:** Se adapta perfectamente tanto a pantallas de computadora como a teléfonos móviles.

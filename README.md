# Resumen del desarrollo y mejoras de SR Store

Durante la conversación, se trabajó en el desarrollo de una aplicación web llamada **SR Store** para la gestión de inventario de productos. Se realizaron las siguientes acciones y mejoras:

1. **Corrección de errores y mejoras funcionales:**

   - Corrección en el guardado de cantidad y precio de productos, y el cálculo del total.
   - Mejora del margen entre el header y el main, y reemplazo de prompts/confirm nativos por alertas personalizadas.
   - Implementación de un sistema de notificaciones tipo modal, apilables y con buen diseño.
   - Limitación de la visualización de tarjetas de productos a dos filas con scroll y un indicador visual.
   - Agregado de botones para importar/exportar productos en Excel, con un modal de instrucciones y validación.
   - Integración de la librería SheetJS para el manejo de archivos Excel.
   - Implementación de la importación/exportación multilingüe de productos, con validación y confirmaciones.
   - Añadida funcionalidad de actualización de contraseña con validaciones de seguridad.
   - Creación de un tour interactivo (burbujas de ayuda) que aparece la primera vez y luego mediante un botón flotante.
   - Implementación de un modo oscuro completo y un selector de idioma (español, inglés, francés, chino), ambos en la barra superior y sincronizados con el login.
   - Traducción de todos los textos clave de la interfaz, incluyendo formularios, modales, alertas, tour, footer y categorías.
   - Exportación a Excel usando los nombres de las categorías en el idioma seleccionado.

2. **Mejoras visuales y de accesibilidad:**

   - Mejora del contraste y la legibilidad en modo oscuro (inputs, selects, tablas, botones, etc.).
   - Centrado del botón de "Iniciar Sesión".
   - Eliminación de los iconos de Font Awesome por problemas de visualización y compatibilidad.
   - Personalización del footer con un mensaje especial del usuario.

3. **Documentación:**

   - Generación de un README completo y profesional, con secciones de descripción, características, instalación, uso, internacionalización, modo oscuro, importación/exportación Excel, tecnologías, agradecimientos y contacto.
   - Sugerencia y explicación sobre cómo agregar imágenes y badges (por ejemplo, logos de HTML, CSS, JS) en el README, con ejemplos de uso de SVGs y Shields.io.

4. **Soporte y personalización:**
   - Corrección de errores ortográficos en las traducciones.
   - Ajuste de detalles visuales y de traducción según el feedback del usuario.
   - Preparación de la app para futuras personalizaciones, especialmente en el footer.

En resumen, la conversación cubrió el desarrollo, mejora, internacionalización, accesibilidad, documentación y personalización de una app de inventario web, asegurando que sea moderna, multilingüe, usable y lista para producción.

# SR Store

**SR Store** es una aplicación web moderna para la gestión de inventario de productos, pensada para pequeñas y medianas empresas, tiendas o cualquier persona que necesite llevar un control eficiente y visual de sus productos.

---

## 🚀 Características principales

- **Gestión de productos**: Agrega, edita y elimina productos fácilmente.
- **Estadísticas en tiempo real**: Visualiza el total de productos, valor total, categorías y stock bajo.
- **Importación y exportación Excel**: Carga productos desde un archivo Excel o descarga tu inventario en el idioma seleccionado.
- **Internacionalización (i18n)**: Soporte para Español, Inglés, Francés y Chino. Cambia el idioma en cualquier momento.
- **Modo oscuro/claro**: Alterna entre ambos modos con un solo clic. Preferencia guardada automáticamente.
- **Tour interactivo**: Guía visual para nuevos usuarios sobre cómo usar la app.
- **Actualización de contraseña**: Cambia tu contraseña de forma segura desde la interfaz.
- **Responsive**: Diseño adaptable a móviles, tablets y escritorio.

---

## 📦 Instalación y uso

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd <carpeta-del-proyecto>
   ```
2. **Abre el archivo `index.html` en tu navegador.**
   - No requiere backend ni instalación de dependencias.
   - Todo funciona en el navegador usando LocalStorage.

---

## 📝 Estructura del proyecto

```
semana 3 entranamiento/
├── index.html
├── main.js
├── styles.css
└── README.md
```

---

## 🌍 Internacionalización

- Cambia el idioma desde la barra superior o el login.
- Todos los textos, botones, menús, modales y alertas se traducen automáticamente.
- Idiomas soportados:
  - Español 🇪🇸
  - Inglés 🇬🇧
  - Francés 🇫🇷
  - Chino 🇨🇳

---

## 🌗 Modo oscuro

- Actívalo/desactívalo con el botón de la barra superior.
- Preferencia guardada en el navegador.
- Contraste y legibilidad optimizados para ambos modos.

---

## 📥 Importar y exportar productos con Excel

- **Importar:**

  1. Haz clic en "Importar Excel".
  2. Descarga la plantilla de ejemplo y sigue el formato:
     | Nombre | Precio | Cantidad | Categoría |
     | --------------|--------|----------|--------------|
     | iPhone 13 | 999.99 | 10 | electronica |
     | Camiseta Básica | 25.50 | 50 | ropa |
  3. Sube tu archivo y confirma la importación.

- **Exportar:**
  - Haz clic en "Exportar Excel" y descarga tu inventario con los nombres de las categorías en el idioma seleccionado.

---

## 🛠️ Tecnologías utilizadas

- **HTML5, CSS3, JavaScript (ES6+)**
- **[SheetJS](https://sheetjs.com/)** para manejo de archivos Excel
- **LocalStorage** para persistencia de datos

---

## 🙏 Agradecimientos

- Proyecto desarrollado por **Sebastian Rodelo** (Riwi Coder)
- Hecho con 💜 y mucho código

---

## 📬 Contacto

¿Tienes dudas, sugerencias o quieres colaborar?

- Email: [sebastianrodelog@gmail.com](mailto:sebastianrodelog@gmail.com.com)
- LinkedIn: [Sebastian Rodelo](https://www.linkedin.com/in/sebastian-rodelo-2a30041b1/)

---

¡Gracias por usar SR Store! 🎉

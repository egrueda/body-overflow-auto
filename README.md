# Body Overflow Auto - Chrome Extension

Una extensión de Chrome que permite cambiar fácilmente la propiedad `overflow` del elemento `<body>` a "auto" para habilitar el scroll en páginas que lo tienen bloqueado.

## 🚀 Características

- ✅ Detecta automáticamente páginas con `overflow: hidden`
- ✅ Cambia el overflow a "auto" con un solo clic
- ✅ Guarda y restaura el valor original
- ✅ Interfaz simple y limpia
- ✅ Funciona en todas las páginas web

## 📥 Instalación

### Método 1: Chrome Web Store (Recomendado)
*[Próximamente - enlace a la store]*

### Método 2: Instalación Manual

1. **Descarga la extensión**
   ```bash
   git clone https://github.com/egrueda/body-overflow-auto.git
   # O descarga el ZIP desde Releases
   ```

2. **Instala en Chrome**
   - Abre Chrome y ve a `chrome://extensions/`
   - Activa el "Modo de desarrollador" (esquina superior derecha)
   - Haz clic en "Cargar extensión sin empaquetar"
   - Selecciona la carpeta descargada

3. **¡Listo!** El icono aparecerá en tu barra de herramientas

## 🔧 Uso

1. Ve a cualquier página web
2. Haz clic en el icono de la extensión
3. Usa los botones:
   - **"Establecer overflow: auto"**: Habilita el scroll
   - **"Restaurar overflow original"**: Vuelve al estado original

## 🛠️ Desarrollo

```bash
# Estructura del proyecto
body-overflow-auto/
├── manifest.json      # Configuración de la extensión
├── popup.html         # Interfaz del popup
├── popup.js           # Lógica del popup
├── content.js         # Script que se ejecuta en las páginas
├── icon.svg           # Icono fuente en formato SVG
├── icons/             # Iconos en diferentes tamaños
│   ├── icon16.png     # Icono 16x16px
│   ├── icon32.png     # Icono 32x32px
│   ├── icon48.png     # Icono 48x48px
│   └── icon128.png    # Icono 128x128px
└── README.md          # Este archivo
```

### Tecnologías utilizadas
- **Manifest V3** (última versión de Chrome Extensions)
- **Vanilla JavaScript** (sin dependencias)
- **HTML/CSS** para la interfaz

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

MIT License - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🐛 Reportar Problemas

Si encuentras algún problema o tienes una sugerencia, por favor:
1. Revisa si ya existe un [issue similar](https://github.com/egrueda/body-overflow-auto/issues)
2. Si no, crea un [nuevo issue](https://github.com/egrueda/body-overflow-auto/issues/new)

## ⭐ ¿Te gusta el proyecto?

¡Dale una estrella en GitHub! Ayuda a otros desarrolladores a encontrar la extensión.

---

**Desarrollado con ❤️ para mejorar la experiencia de navegación web**

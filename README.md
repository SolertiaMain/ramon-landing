# Ramon Landing Page

Landing page profesional desarrollada con Next.js para mostrar los servicios, certificaciones, talleres, podcast y blog de Ramon.

## 🚀 Tecnologías

- **Next.js 16.1.6** - Framework React con App Router
- **React 19.2.3** - Biblioteca de UI
- **Tailwind CSS v4** - Framework de CSS utility-first
- **ESLint** - Linter para mantener la calidad del código

## 📋 Requisitos Previos

- Node.js 18.17 o superior
- npm, yarn, pnpm o bun

## 🛠️ Instalación

1. Clona el repositorio:
git clone <url-del-repositorio>
cd ramon-landing2. Instala las dependencias:
npm install
# o
yarn install
# o
pnpm install## 🏃 Desarrollo

Inicia el servidor de desarrollo:

npm run dev
# o
yarn dev
# o
pnpm devAbre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 📁 Estructura del Proyecto
ramon-landing/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globales con Tailwind CSS
│   │   ├── layout.js        # Layout principal
│   │   └── page.js          # Página principal
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   └── sections/
│   │       ├── Blog.jsx
│   │       ├── Certifications.jsx
│   │       ├── Contact.jsx
│   │       ├── Hero.jsx
│   │       ├── Letter.jsx
│   │       ├── Podcast.jsx
│   │       ├── Statement.jsx
│   │       └── Workshops.jsx
│   └── content/
│       └── site.js          # Contenido y configuración del sitio
├── public/                  # Archivos estáticos
└── package.json
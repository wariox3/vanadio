# Metronic Angular Tailwind Boilerplate

[![Angular Version](https://img.shields.io/badge/Angular-17.3.0-%23DD0031?logo=angular)](https://angular.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-%2338B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![NgRx](https://img.shields.io/badge/NgRx-17.2.0-%23BA2BD2?logo=redux)](https://ngrx.io/)
[![Metronic](https://img.shields.io/badge/Metronic-9.0-%23005B9F)](https://keenthemes.com/metronic/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Boilerplate oficial de Metronic 9 para Angular 17 con Tailwind CSS. Este template premium proporciona una base sólida para desarrollar aplicaciones empresariales con una interfaz de usuario moderna y profesional, componentes prediseñados y una estructura optimizada.

## Características

### Core
- **Metronic 9**: Template premium empresarial con más de 100 componentes UI/UX prediseñados.
- **Angular 17**: Framework progresivo con las últimas características como Signals y SSR.
- **Tailwind CSS 3.4**: Integración completa con utilidades personalizadas para Metronic.
- **NgRx 17**: Gestión de estado reactivo con Store, Effects y DevTools.
- **Cloudflare Turnstile**: Protección contra bots y spam en formularios de autenticación.

### Componentes Metronic
- **Layouts múltiples**: Incluye varios diseños de página predefinidos (default, dark, light).
- **Componentes avanzados**: Tablas de datos, gráficos, formularios, modales, wizards.
- **Tema personalizable**: Sistema de temas con modo claro/oscuro y colores personalizables.
- **Iconos Metronic**: Biblioteca completa de iconos con estilos filled, outline y duotone.

### Estructura y herramientas
- **Autenticación**: Sistema completo con login, registro y recuperación de contraseña.
- **Interceptores HTTP**: Manejo de tokens y errores automatizado.
- **Estructura modular**: Organización optimizada para aplicaciones empresariales.
- **Herramientas de desarrollo**: ESLint y Prettier configurados con reglas específicas.

## Requisitos previos

- Node.js v18+
- npm v9+
- Angular CLI v17+

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd angular-metronic-tailwind
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Estructura del proyecto

```
src/
├── app/
│   ├── common/       # Componentes, directivas y pipes comunes
│   ├── core/         # Servicios core, guards y utilidades
│   ├── layouts/      # Layouts Metronic (default, dark, light)
│   ├── modules/      # Módulos funcionales (auth, dashboard, etc.)
│   ├── partials/     # Componentes parciales de Metronic
│   └── store/        # Configuración NgRx (actions, reducers, effects)
├── assets/           # Recursos estáticos (imágenes, iconos, etc.)
├── environments/     # Configuraciones de entorno
└── metronic/         # Núcleo del tema Metronic
    ├── core/         # Utilidades y helpers de Metronic
    ├── app/          # Componentes base de la aplicación
    ├── css/          # Estilos base de Metronic
    └── vendors/      # Bibliotecas de terceros integradas
```

## Integración Metronic-Angular-Tailwind

Este boilerplate ofrece una integración completa entre Metronic, Angular y Tailwind CSS:

- **Componentes Angular**: Los componentes de Metronic están implementados como componentes nativos de Angular.
- **Directivas personalizadas**: Incluye directivas específicas para funcionalidades de Metronic.
- **Configuración Tailwind**: El archivo `tailwind.config.js` está preconfigurado con todas las variables y plugins necesarios para Metronic.
- **Sistema de temas**: Implementación completa del sistema de temas de Metronic con soporte para modo claro/oscuro.
- **Plugins personalizados**: Incluye plugins de Tailwind específicos para Metronic que extienden las funcionalidades base.

## Variables de entorno

Configura el archivo `environment.ts` dentro de la carpeta `/environments`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com',
  turnstileSiteKey: 'TU_CLAVE_DE_SITIO_TURNSTILE',  // Clave de sitio de Cloudflare Turnstile
  // Otras variables de configuración
};
```

## Seguridad con Cloudflare Turnstile

Este boilerplate incluye la integración de Cloudflare Turnstile, una alternativa moderna a CAPTCHA para proteger tus formularios contra bots y spam.

### Características de la implementación

- **Integración con Angular**: Utiliza el paquete `ngx-turnstile` para una fácil implementación.
- **Activación condicional**: Solo se activa en entornos de producción.
- **Validación automática**: Integrado con los formularios reactivos de Angular.
- **Experiencia de usuario mejorada**: Menos intrusivo que los CAPTCHAs tradicionales.

### Configuración

1. Obtén tus claves de sitio y secreta en el [Panel de Cloudflare](https://dash.cloudflare.com/?to=/:account/turnstile)

2. Configura la clave de sitio en tu archivo `environment.ts`:
   ```typescript
   turnstileSiteKey: 'TU_CLAVE_DE_SITIO_TURNSTILE'
   ```

3. El componente ya está implementado en los formularios de autenticación:
   ```html
   <ngx-turnstile
     [siteKey]="turnstileToken"
     (resolved)="onTurnstileSuccess($event)"
   ></ngx-turnstile>
   ```

## Scripts disponibles

- **Desarrollo**: Inicia el servidor de desarrollo
  ```bash
  npm start
  ```

- **Compilación**: Genera los archivos para producción
  ```bash
  npm run build
  ```

- **Pruebas**: Ejecuta las pruebas unitarias
  ```bash
  npm test
  ```

- **Linting**: Verifica el código con ESLint
  ```bash
  npm run lint
  ```

- **Formateo**: Formatea el código con Prettier
  ```bash
  npm run format
  ```

## Personalización de Metronic y Tailwind

### Sistema de temas de Metronic

Metronic incluye un sistema de temas completo que puedes personalizar:

- **Colores del tema**: Modifica los colores principales en `tailwind.config.js` en la sección `theme.extend.colors`
- **Modos de tema**: Alterna entre modo claro y oscuro usando la clase `dark` (implementado con `darkMode: 'class'`)
- **Componentes personalizados**: Todos los componentes de Metronic se pueden personalizar a través de clases de Tailwind

### Plugins de Tailwind para Metronic

El boilerplate incluye plugins personalizados para Metronic que extienden Tailwind:

- **Plugin de tema**: Gestiona las variables CSS para los modos claro/oscuro
- **Plugin de componentes**: Proporciona utilidades para los componentes de Metronic
- **Plugin de breakpoints**: Define los puntos de ruptura específicos de Metronic

Puedes ver y modificar estos plugins en `src/metronic/core/plugins/`.

## Documentación oficial

- [Metronic Angular](https://preview.keenthemes.com/metronic8/angular/docs/quick-start)
- [Metronic Tailwind](https://keenthemes.com/metronic/tailwind/docs/overview)
- [Angular](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NgRx](https://ngrx.io/docs)

## Soporte y recursos

- [Portal de Keenthemes](https://keenthemes.com/support)
- [Actualizaciones de Metronic](https://keenthemes.com/metronic/updates)
- [Comunidad de Metronic](https://keenthemes.com/forums)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.


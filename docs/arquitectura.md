# Arquitectura del Proyecto Futurama

Este documento explica en detalle la arquitectura del proyecto Futurama, una aplicación web full-stack construida con Next.js.

## Visión General

El proyecto Futurama es una aplicación web que muestra información sobre personajes de la serie animada Futurama. La arquitectura del proyecto es full-stack utilizando exclusivamente Next.js, sin necesidad de Express.js ni Node.js por separado.

## Componentes Principales

### Frontend
- **Framework**: React 18.2.0
- **Biblioteca de UI**: Next.js 13.4.1
- **Estilos**: Tailwind CSS 3.3.2
- **Iconos**: React Icons
- **Animaciones**: Framer Motion

### Backend
- **API Routes**: Proporcionadas por Next.js
- **Endpoints**: `/api/characters`, `/api/characters/[slug]`, `/api/character-avatar/[slug]`
- **Sin servidor separado**: Next.js maneja todas las solicitudes HTTP

### Almacenamiento de Datos
- **Formato**: Archivos JSON
- **Ubicación**: `/data/characters.json`
- **Sin base de datos tradicional**: Todos los datos son estáticos y se almacenan en archivos JSON

## Estructura de Carpetas

```
/app                  # Directorio principal de Next.js App Router
  /api                # API Routes (backend)
    /characters       # Endpoints para datos de personajes
    /character-avatar # Endpoint para avatares de personajes
  /characters         # Páginas de detalle de personajes
  /page.jsx           # Página de inicio
/components           # Componentes React reutilizables
/data                 # Archivos JSON con datos
/public               # Recursos estáticos (imágenes, etc.)
/lib                  # Utilidades y funciones auxiliares
/utils                # Funciones de utilidad adicionales
```

## Flujo de Datos

1. **Solicitud de Cliente**: El navegador solicita una página o datos
2. **Renderizado de Página**: Next.js renderiza la página (SSR o CSR según el caso)
3. **Solicitud de Datos**: El componente React hace una solicitud fetch a un endpoint de API interno
4. **Procesamiento de API**: El endpoint lee los datos del archivo JSON
5. **Transformación de Datos**: La API procesa y transforma los datos según sea necesario
6. **Respuesta al Cliente**: Los datos se devuelven al componente React
7. **Renderizado Final**: El componente muestra los datos en la interfaz de usuario

## Ventajas de esta Arquitectura

1. **Simplicidad**: Todo está en un solo proyecto y framework
2. **Rendimiento**: Next.js optimiza automáticamente el rendimiento
3. **Facilidad de despliegue**: Se puede desplegar como una sola aplicación
4. **Sin necesidad de gestionar múltiples servidores**: Backend y frontend juntos
5. **Desarrollo más rápido**: Menos configuración y menos herramientas para gestionar

## Características Técnicas Destacadas

- **Server-side Rendering (SSR)**: Para mejor SEO y rendimiento inicial
- **API Routes**: Para manejar solicitudes de datos sin necesidad de un servidor separado
- **Componentes del lado del cliente**: Marcados con 'use client' para interactividad
- **Manejo de imágenes**: Componente personalizado para manejar errores en imágenes
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla
- **Estilos temáticos**: Diseño futurista acorde con la temática de Futurama

## Comunicación Frontend-Backend

El frontend se comunica con el backend a través de solicitudes fetch a los endpoints de API internos:

```javascript
// Ejemplo de solicitud a la API
async function fetchCharacters() {
  const response = await fetch(`/api/characters?t=${timestamp}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  })
  const data = await response.json()
  // Procesar datos...
}
```

## Endpoints de API

- **GET /api/characters**: Devuelve una lista de todos los personajes
- **GET /api/characters/[slug]**: Devuelve información detallada sobre un personaje específico
- **GET /api/character-avatar/[slug]**: Genera un avatar para un personaje cuando no hay imagen disponible

## Conclusión

La arquitectura del proyecto Futurama es un ejemplo excelente de una aplicación full-stack moderna construida con Next.js. Al utilizar Next.js para manejar tanto el frontend como el backend, el proyecto logra una arquitectura simplificada pero potente, sin necesidad de servidores o frameworks adicionales.

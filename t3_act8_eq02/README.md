# Actividad 8 - Consumo de APIs de terceros

## English Lab // Learning System

Mini sistema administrativo desarrollado con **React + Vite** para la Actividad 8 de Programación Web.

### Integrantes
- Braulio Mendoza Vargas
- Samuel Pérez Ramírez

## API elegida

Se utiliza **DummyJSON**:

- Login: `https://dummyjson.com/auth/login`
- Usuarios/estudiantes: `https://dummyjson.com/users`
- Agregar: `POST https://dummyjson.com/users/add`
- Editar: `PUT https://dummyjson.com/users/:id`
- Eliminar: `DELETE https://dummyjson.com/users/:id`

> DummyJSON simula las operaciones de escritura. Por eso, después de cada POST/PUT/DELETE, la aplicación también actualiza el estado local de React para reflejar el cambio en la tabla.

## Credenciales de prueba

- Usuario: `emilys`
- Contraseña: `emilyspass`

También se permite iniciar sesión escribiendo el correo del usuario; la aplicación localiza primero el `username` correspondiente y después realiza el login.

Para la interfaz de English Lab se muestran únicamente dos tipos: **Profesor** y **Estudiante**. Los roles `admin` y `moderator` de DummyJSON se presentan como Profesor; `user` se presenta como Estudiante. Esto no modifica la autenticación real de DummyJSON.

## Funcionalidades

### Fase 1 - Login
- Validación de campos vacíos.
- Login real mediante `POST` a DummyJSON.
- Mensaje de error si las credenciales son incorrectas.
- Datos del usuario e imagen guardados en el estado de la aplicación.

### Fase 2 - Sistema
- Sidebar con Inicio, Estudiantes y Reportes de errores.
- Navbar con foto, nombre, tipo de usuario (Profesor/Estudiante) y un único botón Cerrar sesión.
- Vista protegida: si no existe sesión se muestra únicamente el login.

### Fase 3 - Tabla de estudiantes
- Datos obtenidos de DummyJSON Users.
- Filtro de texto por nombre, correo o universidad.
- Filtros visuales por nivel y última actividad, siguiendo el mockup de Figma.
- Filtro por tipo de usuario (Profesor/Estudiante), basado en el rol entregado por DummyJSON.
- Selector de 10, 20, 40 o 50 registros por página.
- Paginación reflejada en la URL: `?page=2&limit=20`.
- Estado de carga y mensajes de error.
- Agregar, editar y eliminar con llamadas reales a la API y actualización del estado local.
- Alta y edición de universidad desde el modal de estudiantes.
- Confirmación antes de editar o eliminar.

## Organización

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── StudentModal.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   ├── ReportsPage.jsx
│   └── StudentsPage.jsx
├── services/
│   └── api.js
├── utils/
│   └── student.js
├── App.jsx
├── main.jsx
└── styles.css
```

Las llamadas a DummyJSON están separadas en `src/services/api.js` y no se escriben directamente dentro de cada componente.

## Ejecución local

```bash
npm install
npm run dev
```

## Build para VPS

La actividad solicita publicar en la ruta:

```text
/t3_act8_eq02/
```

El archivo `vite.config.js` ya incluye:

```js
base: '/t3_act8_eq02/'
```

Generar el build:

```bash
npm run build
```

Después se debe subir el contenido de `dist/` a la ruta correspondiente servida por Nginx.

## Enlace de despliegue

`http://IP_DE_SU_VPS/t3_act8_eq02/`

Reemplazar `IP_DE_SU_VPS` por la IP real al finalizar el despliegue.

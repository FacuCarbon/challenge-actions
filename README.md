# Challenge Actions

Está aplicación fue compuesta en base a un challenge solicitado, para obtener la cotización de algunas acciones.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Técnologias](#tecnologias)
- [Librerías](#librerias)
- [Características](#características)
- [Autor](#autor)

## Instalación

Asegúrate de tener Node.js instalado en tu máquina.

1. Clona este repositorio:

```bash
git clone <https://github.com/FacuCarbon/challenge-actions.git> o por ssh <git@github.com:FacuCarbon/challenge-actions.git>
```

## Uso

1. Navegar a la carpeta:

```bash
cd challenge-actions
```

2. Instalar dependencias:

```bash
npm install o npm i
```

3. Ejecutar la aplicación en desarrollo:

```bash
npm run dev
```

4. Construir la aplicación para producción:

```bash
npm run build
```

## Técnologias

- [React js](https://es.react.dev/) - [Vite](https://vitejs.dev/guide/) - [Typescript](https://www.typescriptlang.org/)

## Librerías

- [Prime react](https://primereact.org/installation/)
- [React icons](https://react-icons.github.io/react-icons/)
- [Moment](https://momentjs.com/docs/)

## Características

- Tabla paginada de acciones.
- Buscador en la tabla para símbolo y nombre.
- Detalle de cada acción con filtros para mejorar el gráfico.
- Tiempo real: Busca desde el inicio del día (hoy, a las 00:00:00) hasta el final del día (hoy, a las 23:59:00), se actualiza el gráfico dependiendo del tiempo de intervalo seleccionado.
- Histórico: Busca dependiendo de la fecha y hora de inicio seleccionado, hasta la fecha y hora seleccionado para el final del día.
- Favoritos: el usuario podrá seleccionar, gestionar y almacenar sus stocks favoritos:
  - Se almacenan en un estado, y para persistencia en localstorage.

## Autor

### Facundo Carbón

#### facundocarbon2015@gmail.com

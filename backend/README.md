# Ecobridge Backend

Este es el repositorio que contiene el código del backend para el proyecto Ecobridge, el cual es nuestra propuesta para Call for Code 2021. El proyecto utiliza Python 3.9 con FastAPI y Uvicorn.

## Para Comenzar

Para preparar el entorno y iniciar el servidor utilizar los siguientes pasos, preferiblemente utilizando la versión en contenedor.

### Utilizando Docker o Podman

Primero se debe crear la imagen del contenedor. Se pueden utilizar varias herramientas para esto. A continuación, se muestran los comandos para construir la imagen del contenedor en diversas herramientas.

- docker
  ```bash
  docker build -t ecobridge-backend .
  ```
- podman
  ```bash
  podman build -t ecobridge-backend .
  ```
- buildah
  ```bash
  buildah bud -t ecobridge-backend .
  ```

Cuando esta la imagen creada, ya se puede iniciar el contenedor. Para que el servidor inicie, se debe tener el archivo `.env` ya definido en el directorio raíz del proyecto, con las variables de entorno necesarias. Ver el archivo `.env.example` para tener referencia.

- docker
  ```bash
  docker run -p8000:8000 -d --env-file ./.env --name ecobridge-backend ecobridge-backend
  ```
- podman
  ```bash
  podman run -p8000:8000 -d --env-file ./.env --name ecobridge-backend ecobridge-backend
  ```

Esto iniciará el contenedor del servidor en el puerto 8000 en modo detached. Nos aseguramos de que este corriendo el contenedor.

- docker
  ```bash
  docker ps
  ```
- podman
  ```bash
  podman ps
  ```

Si el contenedor del servidor está corriendo, podemos acceder a la documentación del API en http://localhost:8000/docs. Se puede acceder a los logs del servidor por medio del siguiente comando.

- docker
  ```bash
  docker logs -f ecobridge-backend
  ```
- podman
  ```bash
  podman logs -fl
  ```

### Corriendo el Servidor Nativamente

El proyecto utiliza Poetry como gestor de paquetes. Poetry facilita la gestión del proyecto y sus dependencias. Es necesario instalarlo antes de poder inicializar el proyecto nativamente. Para instalar Poetry, seguir la [documentación](https://python-poetry.org/docs/#installation). Recomendable utilizar las versiones 1.1. Actualmente la 1.1.7 es la última.

- Es recomendable cambiar la configuración de Poetry sobre como guarda los virtual environments, para que se guarden en el directorio del proyecto. No es necesario, pero recomendable.

  ```bash
  poetry config virtualenvs.in-project true
  ```

- Instalamos las dependencias del proyecto. Este comando se corre en la raíz del proyecto.

  ```bash
  poetry install
  ```

## Desarrollo

Si se va a trabajar con el código del backend, por el momento, se debe correr el servidor nativamente.

- Para correr el servidor con autoreload

  ```bash
  poetry run uvicorn app.main:app --reload --reload-dir=./app
  ```

- Para correr los tests

  ```bash
  poetry run pytest -v
  ```

- Para hacer typechecking en todo el proyecto
  ```bash
  poetry run mypy ./app
  ```

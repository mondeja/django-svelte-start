# django-svelte-start

Modern starter template for Django + Svelte projects. It includes:

- ESBuild for building Svelte frontend.
- Live reload for backend and frontend.
- Prettier and ESLint for code formatting and linting.
- Prek for automatic code checks.
- Hatch for backend build system.

## Development environment setup

Create a virtual environment and activate it:

```sh
python3 -m virtualenv venv && . venv/bin/activate
```

Install Python development requirements:

```sh
python3 -m pip install . prek && prek install
```

Install NodeJS requirements:

```sh
npm install
```

Process initial migrations:

```sh
python3 manage.py migrate
```

## Start developing

Open two terminals and run these commands (one in each terminal):

```sh
npm run watch
```

```sh
python3 manage.py runserver
```

Then go to <http://127.0.0.1:8000> on your browser.

## Linting and formatting

```sh
prek run -a
```

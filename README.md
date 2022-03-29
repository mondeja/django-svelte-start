# django-svelte-start

## Development environment setup

1. Create a virtual environment and activate it:

```bash
python3 -m virtualenv venv && . venv/bin/activate
```

2. Install Python development requirements:

```bash
python3 -m pip install .[dev]
pre-commit install
```

3. Install NodeJS requirements:

```bash
npm install
```

4. Process initial migrations:

```bash
python3 manage.py migrate
```

## Start developing

Open two terminals and run these commands (one in each terminal):

```sh
npm run build:watch
```

```sh
python3 manage.py runserver
```

Then go to http://127.0.0.1:8000/ on your browser.

> Make sure that you've activated the Python virtual environment before!

# Node API Timezone Clock

Server for the Timezone Clock project, use for hiding API keys, rate limiting and caching.

This API uses:

- The [Ninja Quotes API](https://api-ninjas.com/api/quotes)
- The [Ipinfo API](https://ipinfo.io/)

## Usage

### Install dependencies

```bash
npm install
```

### Run on http://localhost:5000

```bash
npm run dev
```

## Technologies

- Typescript
- Express JS
- Axios

## Notes

If you want to use this API you will need to create a .env file and add the necessary values.

```bash
NODE_ENV=development
PORT=5000
QUOTES_API_KEY=xxxxxxx
IPINFO_API_KEY=xxxxxxx
```

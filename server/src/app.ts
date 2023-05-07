import { createServer, PORT } from './utils';

// Initialize server
const app = createServer();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

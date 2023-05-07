import { createServer } from './utils/server';
import { PORT } from './constants';

// Initialize server
const app = createServer();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

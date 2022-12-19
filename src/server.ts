import app from './app';
import { env } from './config/config';

async function init() {
   try {
      const port = env.port;
      app.listen(port, () => console.log(`Server running on port ${port}`));
   } catch (error) {
      console.error(`An error occurred: ${JSON.stringify(error)}`);
      process.exit(1);
   }
}

init();

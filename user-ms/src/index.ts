import app from './app';
import intiDb from './configs/db';
import {config} from 'dotenv';
import logger from './configs/logger';

config();
const port = process.env.PORT || 8002;
async function startServer () {
    await intiDb()
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`)
    })
  }
  
  void startServer()
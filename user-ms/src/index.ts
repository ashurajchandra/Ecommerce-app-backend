import app from './app';
import intiDb from './configs/db';
import 'dotenv/config';



const port = process.env.PORT || 8002;
async function startServer () {
    await intiDb()
    app.listen(port, () => {
      console.info(`Server is running on port ${port}`)
    })
  }
  
  void startServer()
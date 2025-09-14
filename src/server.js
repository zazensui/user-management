import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default server;
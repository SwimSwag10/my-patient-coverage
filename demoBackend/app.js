import express from 'express'
import cors from 'cors'
import registerEndpoints from "./src/utils/endpoints.js"

const app = express()
const port = 3080

app.use(express.json({ limit: '10mb' }));

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

registerEndpoints(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
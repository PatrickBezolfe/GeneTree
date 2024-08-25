const express = require('express')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express()
const port = 3030
require('./database/dbConfig')

app.use(cors())
app.use(express.json());
app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
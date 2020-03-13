const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

router.get("/api", (req, res) => {
  res.json({ message: "welcome to the Hubs API", })
})

module.exports = router

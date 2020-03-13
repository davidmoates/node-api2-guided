const express = require('express')
const Hubs = require('./hubs-model');

const router = express.Router()

// This handles the route /api/hubs
router.get('/', (req, res) => {
  const opts = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
  }

  Hubs.find(opts)
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  });
});


router.get('/:id', (req, res) => {
  Hubs.findById(req.params.id)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  });
});

// This handles POST /api/hubs
router.post('/', (req, res) => {
  Hubs.add(req.body)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});

// This handles PUT /api/hubs/:id
router.put('/:id', (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
});

// This handles DELETE /api/hubs/:id
router.delete('/:id', (req, res) => {
  Hubs.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  });
});

// A route for listing out a hub's messages
// This handles GET /api/hubs/:id/messages
router.get("/:id/messages", (req, res) => {
  Hubs.findHubMessages(req.params.id)
  .then(messages => {
    res.status(200).json(messages)
    // or just res.json(message) since express defaults to a 200
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Could not get hub messages',
    });
  });
})
// A route for specific message by ID
// This handles GET /api/hubs/:hubId/messages/:messagesId
router.get("/:hubId/messages/:messagesId", (req, res) => {
  Hubs.findMessageById(req.params.hubId, req.params.messageId)
  .then(message => {
    if (message) {
      res.json(message)
    } else {
      res.status(404).json({ message: "Message was not found" })
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Could not get hub message',
    });
  });
})

module.exports = router

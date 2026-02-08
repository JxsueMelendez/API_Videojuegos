const express = require("express");
const router = express.Router();
const GameController = require("../Controllers/games.controller");

router.post('/api/games', GameController.postGame);
router.get('/api/games', GameController.getGames);
router.delete('/api/games/:id', GameController.deleteGame);
router.get('/api/games/:id', GameController.gameById);
router.put('/api/games/:id', GameController.putGame);

module.exports = router;
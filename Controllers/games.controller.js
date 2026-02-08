const GameService = require("../Service/game.service")
const CreateGameDTO = require("../DTOs/create-game.DTO")

class GameController {
    async postGame(req, res) {
        try {
            const { titulo, genero, estudio, anio } = req.body;
            const gameDTO = new CreateGameDTO(titulo, genero, estudio, anio);
            const CreatedGame = await GameService.create(gameDTO)

            res.status(201).json({
                message: "Juego añadido con exito",
                data: CreatedGame
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async getGames(req, res) {
        const games =  await GameService.getAll()
        res.status(200).json({game: games})
    }

    async gameById(req, res) {
        try {
            const id = parseInt(req.params.id)
            const gameId = await GameService.getById(id)

            res.status(200).json({
                message: "Juego encontrado: ",
                data: gameId
            })
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    async putGame(req, res){
        try {
            const id = parseInt(req.params.id);
            const body = req.body;
            const newUpdate = await GameService.put(id, body)
    
            res.status(200).json({
                message: "Actualizado correctamente",
                data: newUpdate
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    deleteGame(req, res) {
        try {
            const id = parseInt(req.params.id)
            const deletedGame = GameService.delete(id)

            res.status(200).json({
                message: deletedGame
            })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    }
}

module.exports = new GameController();
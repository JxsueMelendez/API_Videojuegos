const fs = require("fs")
const path = require("path")
const { pool } = require("../db")

const InsertInto = async (arg) => {
    await pool.execute('INSERT INTO videojuegos VALUES (?, ?, ?, ?, ?, ?)', 
        [arg.id, arg.titulo, arg.genero, arg.estudio, arg.anio, arg.creado])
}

const SelectAll = async () => {
    const [data] = await pool.query('SELECT * FROM videojuegos')
    return data
}

class GameService {
    async create(gameDTO) {
        const data = SelectAll()

        const existencia = data.find((DBgame) => DBgame.id === gameDTO.id)
        if (existencia) {
            throw new Error("El juego ya existe dentro de la base de datos")
        }

        const newGame = {
            id: data.length + 1,
            ...gameDTO,
            creado: new Date()
        };

        InsertInto(newGame)
        return newGame;
    }

    async getById(id) {
        const [gameIndex] = await pool.execute('SELECT * FROM videojuegos WHERE id = ?', [id])

        if (!gameIndex) {
            throw new Error("Juego no existe")
        }

        return gameIndex
    }

    async put(id, body) {
        const data = await SelectAll()
        const gameIndexed = data.findIndex((game) => game.id === id)

        if(gameIndex === -1){
            throw new Error("Juego no encontrado, verificar id")
        }
        return gameIndex
    }

    async delete(id) {
        const db = getFile();
        const gameIndex = db.videojuegos.findIndex((game) => game.id === id)

        if (gameIndex === -1) {
            throw new Error("El juego no se encuentra, por favor revisar id")
        }

        db.videojuegos.splice(gameIndex, 1)
        postFile(db)
        return { message: "Juego eliminado correctamente" }
    }

    async getAll() {
        const data = SelectAll()
        return data
    }
}

module.exports = new GameService()
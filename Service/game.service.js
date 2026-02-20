const fs = require("fs")
const path = require("path")
const { pool } = require("../db")
const { error } = require("console")

const InsertInto = async (arg) => {
    const [result] = await pool.execute('INSERT INTO videojuegos (titulo, genero, estudio, anio) VALUES (?, ?, ?, ?)',
        [arg.titulo, arg.genero, arg.estudio, arg.anio])

    return result
}

const SelectAll = async () => {
    const [data] = await pool.query('SELECT * FROM videojuegos')
    return data
}

class GameService {
    async create(gameDTO) {
        const [existencia] = await pool.execute('SELECT 1 FROM videojuegos WHERE titulo = ?', [gameDTO.titulo])

        if (existencia.length > 0) {
            throw new Error("El juego ya existe dentro de la base de datos")
        }

        const newGame = {
            ...gameDTO
        };

        const result = await InsertInto(newGame)
        const [objt] = await pool.execute('SELECT * FROM videojuegos WHERE id = ?', [result.insertId])

        return objt
    }

    async getById(id) {
        const [gameIndex] = await pool.execute('SELECT * FROM videojuegos WHERE id = ?', [id])

        if (!gameIndex) {
            throw new Error("Juego no existe")
        }

        return gameIndex
    }

    async put(id, body) {
        const [game] = await pool.execute('SELECT 1 FROM videojuegos WHERE id = ?', [id])

        if (!game || game.length === 0) {
            throw new Error("Juego no existe")
        }

        const object = Object.entries(body).filter(([_, value]) => value !== undefined && value !== '')

        const allowedFields = ['titulo', 'genero', 'estudio', 'anio']
        const corrected = object.filter(([key, _]) => allowedFields.includes(key))

        if (corrected.length === 0) {
            throw new Error("No hay campos válidos para actualizar")
        }

        const setClause = corrected.map(([key]) => `${key} = ?`).join(', ')
        const values = corrected.map(([, value]) => value)

        await pool.execute(`UPDATE videojuegos SET ${setClause} WHERE id = ?`, [...values, id])

        const [gameUpdated] = await pool.execute('SELECT * FROM videojuegos WHERE id = ? LIMIT 1', [id])

        return gameUpdated
    }

    async delete(id) {
        const [gameIndexed] = await pool.execute('SELECT * FROM videojuegos WHERE id = ?', [id])

        if (!gameIndexed || gameIndexed.length === 0) {
            throw new Error("El juego no se encuentra, por favor revisar id")
        }

        const [result] = await pool.execute('DELETE FROM videojuegos WHERE id = ?', [id])
        return { message: "Juego eliminado correctamente", data: result.info }
    }

    async getAll() {
        const data = await SelectAll()
        return data
    }
}

module.exports = new GameService()
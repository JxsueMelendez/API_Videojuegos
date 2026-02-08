class CreateGameDTO {
    constructor(titulo, genero, estudio, anio){
        if(!titulo || !genero || !estudio || !anio){
            throw new Error("Datos incompletos, por favor verifique")
        }

        this.titulo = titulo;
        this.genero = genero;
        this.estudio = estudio;
        this.anio = anio;
    }
}

module.exports = CreateGameDTO;
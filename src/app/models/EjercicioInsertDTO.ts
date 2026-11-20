export class EjercicioInsertDTO {
    id: number = 0
    materia: string = ''
    tema: string = ''
    enunciado: string = ''
    contenidoJson: string = ''
    respuestaCorrecta: string = ''
    nivelDificultad: number = 1
    generadoPorIa: boolean = false
    idCreadoPor: number | null = null
    estado: string = ''
    idActualizadoPor: number | null = null
}

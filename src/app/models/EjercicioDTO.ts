export class EjercicioDTO {
    id: number = 0
    materia: string = ''
    tema: string = ''
    enunciado: string = ''
    contenidoJson: string = ''
    nivelDificultad: number = 1
    generadoPorIa: boolean = false
    idCreadoPor: number | null = null
    estado: string = ''
    createdAt: string | null = null
    updatedAt: string | null = null
}

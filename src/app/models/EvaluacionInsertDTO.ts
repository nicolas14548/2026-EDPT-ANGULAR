export class EvaluacionInsertDTO {
    id: number = 0
    idEstudiante: number = 0
    tipo: string = ''
    estado: string = ''
    totalEjercicios: number = 0
    fechaInicio: string = ''
    fechaFin: string | null = null
    puntaje: number | null = null
    respuestas: string | null = null
    idCreadoPor: number | null = null
    idActualizadoPor: number | null = null
}

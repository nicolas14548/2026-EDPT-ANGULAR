export class UsuarioInsertDTO {
    id: number = 0
    nombre: string = ''
    apellido: string = ''
    email: string = ''
    password: string = ''
    idRol: number = 0
    idApoderado: number | null = null
    idDocente: number | null = null
    grado: number | null = null
    seccion: string | null = null
    enabled: boolean = true
    idCreadoPor: number | null = null
    idActualizadoPor: number | null = null
}

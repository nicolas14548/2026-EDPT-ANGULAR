export class UsuarioDTO {
    id: number = 0
    nombre: string = ''
    apellido: string = ''
    email: string = ''
    idRol: number = 0
    idApoderado: number | null = null
    idDocente: number | null = null
    grado: number | null = null
    seccion: string | null = null
    estado: string = ''
    fechaRegistro: string | null = null
    updatedAt: string | null = null
}

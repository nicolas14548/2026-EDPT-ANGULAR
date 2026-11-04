export class UsuarioDTO {
    id: number = 0
    nombre: string = ''
    apellido: string = ''
    email: string = ''
    password: string = ''
    idRol: number = 0
    idApoderado: number | null = null
    estado: string = ''
}

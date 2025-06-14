export class UserDTO {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;

    constructor(params: Omit<UserDTO, 'username'>) {
        this.id = params.id;
        this.first_name = params.first_name;
        this.last_name = params.last_name;
        this.username = `${params.first_name} ${params.last_name}`;
        this.email = params.email;
        this.password = params.password;
    }
}


// export interface CreateUserDTO {
//     username: string;
//     email: string;
//     password: string;
// }
//
// export interface UpdateUserDTO {
//     username?: string;
//     email?: string;
//     password?: string;
// }
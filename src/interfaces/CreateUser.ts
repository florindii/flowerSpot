export interface CreateUser {
    createUser: {
        first_name: string | null,
        last_name: string | null,
        date_of_birth: string | null,
        email: string | null,
        password: number | string,
    }
}

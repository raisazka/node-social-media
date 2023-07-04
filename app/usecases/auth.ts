import AuthRepository from "../../frameworks/database/mongodb/repository/auth/authRepo"

interface AuthUseCaseDeps {
    authRepo: AuthRepository
}

class AuthUseCase {
    constructor(private deps: AuthUseCaseDeps) {}

    register = async (name: string, password: string, email: string) => {
        await this.deps.authRepo.register({
            name,
            password,
            email,
        })
    }

    login = () => {}
}

export default AuthUseCase

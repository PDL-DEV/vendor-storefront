import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { UserLoginDto } from "../dto/user-login.dto";
import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserLoginUsecase implements UseCase<UserLoginDto, UserModel> {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(params: UserLoginDto): Observable<UserModel> {
        return this.userRepository.login(params);
    }
}
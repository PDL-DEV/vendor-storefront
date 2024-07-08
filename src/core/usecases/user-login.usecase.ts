import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { UserLoginDto } from "../dto/user-login.dto";
import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AccessTokenModel } from "../models/access-token.model";

export class UserLoginUsecase implements UseCase<UserLoginDto, AccessTokenModel> {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(params: UserLoginDto): Observable<AccessTokenModel> {
        return this.userRepository.login(params);
    }
}
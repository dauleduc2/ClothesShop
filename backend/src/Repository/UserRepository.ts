import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import { BodyUpdateUser } from "../interfaces/requestWithUser";
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async addNewUser(user: User) {
        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        //save to db
        const result = await this.manager
            .save(user)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async updateUserByID(ID: string, data: BodyUpdateUser) {
        const currentData = await this.findByID(ID);
        const result = await this.save({
            ...currentData,
            ...data,
        }).catch((err) => err.sqlMessage);
        return result;
    }

    async findByEmail(email: string) {
        const user = await this.findOne({ email }).catch((err) => err);
        return user;
    }

    async findByUsername(username: string) {
        const user = await this.findOne({ username }).catch((err) => err);
        return user;
    }
    async findByID(ID: string) {
        const user = await this.findOne({ ID }).catch((err) => err);
        return user;
    }
}

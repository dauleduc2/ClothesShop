import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
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

    async findByEmail(email: string) {
        const user = await this.findOne({ email }).catch((err) => err);
        return user;
    }
}

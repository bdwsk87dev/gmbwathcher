import { Model } from "sequelize-typescript";
interface UserCreationAttr {
    username: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttr> {
    id: number;
    username: string;
    password: string;
}
export {};

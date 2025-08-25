import { Sequelize, DataTypes, Model } from 'sequelize';

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: boolean;
    image?: string;
    roleId: string;
    positionId: string;
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        public id!: number;
        public email!: string;
        public password!: string;
        public firstName!: string;
        public lastName!: string;
        public address!: string;
        public phoneNumber!: string;
        public gender!: boolean;
        public image?: string;
        public roleId!: string;
        public positionId!: string;
        static associate(models: any) {
            // define association here
        }
    }
    User.init({
        email: dt.STRING,
        password: dt.STRING,
        firstName: dt.STRING,
        lastName: dt.STRING,
        address: dt.STRING,
        phoneNumber: dt.STRING,
        gender: dt.BOOLEAN,
        image: dt.STRING,
        roleId: dt.STRING,
        positionId: dt.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    });
    return User;
};
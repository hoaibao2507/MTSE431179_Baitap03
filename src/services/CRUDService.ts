import bcrypt from 'bcryptjs'; //import thu viện bcryptjs
import db from '../models/index'; //import db từ models/index.ts
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

export function createNewUser(data: any): Promise<string> { //hàm tạo user với tham số data
    return new Promise(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName:
                data.firstName,
                lastName:
                data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('OK create a new user successfull');
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

export function getAllUser(): Promise<any[]> { //lấy tất cả findAll CRUD
    return new Promise(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let users = db.User.findAll({
                raw: true, //hiến dữ liệu gốc
            });
            resolve(users); //hàm trả về kết quả
        } catch (e) {
            reject(e)
        }
    })
}

export function getUserInfoById(userId: string): Promise<any> {
    return new Promise(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: userId }, //query điều kiện cho tham số
                raw: true
            });
            if (user) {
                resolve(user); //hàm trả về kết quả
            } else {
                resolve([]); //hàm trả về kết quả rồng
            }
        } catch (e) {
            reject(e)
        }
    })
}

export function updateUser(data: any): Promise<any[]> { //hàm put CRUD
    return new Promise(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: data.id } //query điều kiện cho tham số
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                //lấy danh sách user
                let allusers = await db.User.findAll();
                resolve(allusers);
            } else {
                resolve([]); //hàm trả về kết quả rồng
            }
        } catch (e) {
            reject(e)
        }
    })
}

export function deleteUserById(userId: string): Promise<void> { //hàm xóa user
    return new Promise(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                user.destroy();
            }
            resolve(); //là return
        } catch (e) {
            reject(e);
        }
    })
}
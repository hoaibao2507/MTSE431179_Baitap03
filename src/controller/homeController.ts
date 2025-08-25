import db from "../models/index";
import * as CRUDService from "../services/CRUDService";
import { Request, Response } from "express";

export const getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

export const getAboutPage = (req: Request, res: Response): void => {
    res.render("test/about.ejs");
};

export const getCRUD = (req: Request, res: Response): void => {
    res.render("crud.ejs");
};

export const getFindAllCrud = async (req: Request, res: Response): Promise<void> => {
    const data = await CRUDService.getAllUser();
    res.render("users/findAllUser.ejs", {
        datalist: data
    });
};

export const postCRUD = async (req: Request, res: Response): Promise<void> => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send("Post crud to server");
};

export const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.id as string;
    if (userId) {
        const userData = await CRUDService.getUserInfoById(userId);
        res.render("users/editUser.ejs", {
            data: userData
        });
    } else {
        res.send("không lấy được id");
    }
};

export const putCRUD = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const data1 = await CRUDService.updateUser(data);
    res.render("users/findAllUser.ejs", {
        datalist: data1
    });
};

export const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
    const id = req.query.id as string;
    if (id) {
        await CRUDService.deleteUserById(id);
        res.send("Deleted!!!!!!!!!!!!");
    } else {
        res.send("Not find user");
    }
};
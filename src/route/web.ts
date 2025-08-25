import express from "express";
import * as homeController from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app: express.Application): void => {
    router.get("/", (req, res) => {
        return res.send("Dương Nguyễn Hoài Bảo");
    });
    router.get("/home", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.getFindAllCrud);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);
    app.use("/", router);
};

export default initWebRoutes;
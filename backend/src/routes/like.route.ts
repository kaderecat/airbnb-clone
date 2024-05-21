import { Router } from "express";
import { like, unlike } from "../controllers/favoriteController";


const router = Router()

router.post('/' , like)

router.put('/:id' , unlike)


export default router
import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDataBase } from "../database/PostDataBase"
import { IdGenerator } from "../services/IdGenarator"
import { TokenManager } from "../services/TokenManager"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikesDislikesDatabase } from "../database/LikeDislikeDatabase"
export const postRouter = express.Router()

const postController = new PostController
  (
    new PostBusiness(
      new PostDataBase(),
      new IdGenerator(),
      new TokenManager()),
      new LikeDislikeBusiness(
        new LikesDislikesDatabase(),
        new TokenManager())
  )

//=================== CREATE POST
postRouter.post("/",postController.createPost)
//================== GET POSTS
postRouter.get("/",postController.getPost)
//================== EDIT POST
postRouter.put("/:id",postController.editPost)
//================== DELETE POST
postRouter.delete("/:id",postController.deletePost)
//================== LIKE, DISLIKE 
postRouter.put("/:id/like", postController.likeDislike)

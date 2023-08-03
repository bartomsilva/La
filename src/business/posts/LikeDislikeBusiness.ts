import { LikesDislikesDatabase } from "../../database/posts/LikeDislikeDatabase"
import { LikeDislikeInputDTO } from "../../dtos/posts/likeDislike.dto"
import { BadRequestError } from "../../error/BadRequest"
import { NotFoundError } from "../../error/NotFound"
import { LikesDislikesDB, PostDB } from "../../models/posts/Post"
import { TokenManager } from "../../services/TokenManager"


export class LikeDislikeBusiness {

  constructor(
    private likesDislikesDataBase: LikesDislikesDatabase,
    private tokenManager: TokenManager) { }

  public likeDislike = async (input: LikeDislikeInputDTO): Promise<void> => {

    // pega o id do poste 
    const { id: PostId, like, token } = input
    const likeVal: number = like ? 1 : 0

    // validação token 
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == undefined) {
      throw new BadRequestError("token inválido")
    }

    // pega o id do usuário 
    const { id: UserId } = payLoad

    //monta o objeto de likes dislikes
    const postLikeDislike:LikesDislikesDB = {
      user_id: UserId,
      post_id: PostId,
      like: likeVal
    }

    // procurar o post 
    // const post: PostResultDB = await this.likesDislikesDataBase.findPost(PostId)
    const [post]: PostDB[] = await this.likesDislikesDataBase.findPost(PostId)
    if (post === undefined) {
      throw new NotFoundError("post não encontrado")
    }

    // Verifica se o post é do mesmo usuário
    if (post.creator_id === UserId) {
      throw new BadRequestError("ação inválida")
    }

    // pesquisar se ( likes_dislikes ) se não existe IdUser + IdPost
    const likeDislikeDB:LikesDislikesDB = await this.likesDislikesDataBase.findLikeDislike(PostId, UserId)

    // inserir na tabela (caso não haja registro)
    if (likeDislikeDB === undefined) {
      await this.likesDislikesDataBase.insertLikeDislike(postLikeDislike)
      if (likeVal === 1) {
        await this.likesDislikesDataBase.postIncreaseLike(PostId)
      } else {
        await this.likesDislikesDataBase.postIncreaseDislike(PostId)
      }
    } else {
      // deletar o likeDislike se for a mesma opção
      if (likeVal == likeDislikeDB.like) {
        await this.likesDislikesDataBase.delteLikeDislike(PostId, UserId)
        if (likeVal === 1) {
          await this.likesDislikesDataBase.postDecreaseLike(PostId)
        } else {
          await this.likesDislikesDataBase.postDecreaseDislike(PostId)
        }
      } else { // trocar o likeDislike (inverter)
        await this.likesDislikesDataBase.updateLikeDislike(postLikeDislike)
        if (likeVal === 1) { // se deu like
          await this.likesDislikesDataBase.postDecreaseDislike(PostId)
          await this.likesDislikesDataBase.postIncreaseLike(PostId)
        } else {  // se deu dislike
          await this.likesDislikesDataBase.postDecreaseLike(PostId)
          await this.likesDislikesDataBase.postIncreaseDislike(PostId)
        }
      }
    }
  }
}
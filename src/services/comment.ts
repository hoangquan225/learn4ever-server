import { BadRequestError } from "../common/errors";
import { CommentModel } from "../database/comment";
import { userTableName } from "../database/users";
import { sendCommentSocket } from "../socket";
import TTCSconfig from "../submodule/common/config";
import { Comment } from "../submodule/models/comment";

export default class CommentService {
  updateComment = async (body: Comment & { realTime?: boolean }) => {
    const { id, realTime = true } = body;
    let commentData: Comment = new Comment({});
    if (id) {
      // update
      try {
        const comment = await CommentModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...body,
              updateDate: Date.now(),
            },
          },
          { new: true }
        ).populate("idUser");
        if (!comment) {
          return {
            data: "không tồn tại",
            status: TTCSconfig.STATUS_NO_EXIST,
          };
        }
        commentData = new Comment(comment);
        realTime && sendCommentSocket({ comment: commentData });
        return {
          data: commentData,
          status: TTCSconfig.STATUS_SUCCESS,
        };
      } catch (error) {
        throw new BadRequestError();
      }
    } else {
      // create
      try {
        const newComment = await CommentModel.create({
          ...body,
          createDate: Date.now(),
          updateDate: Date.now(),
        }).then(res=> res.populate("idUser"));
        commentData = new Comment(newComment);
        realTime && sendCommentSocket({ comment: commentData });
        return {
          data: commentData,
          status: TTCSconfig.STATUS_SUCCESS,
        };
      } catch (error) {
        throw new BadRequestError();
      }
    }
  };

  getCommentsByIdTopic = async (body: { idTopic: string }) => {
    try {
      const { idTopic } = body;
      const comments = await CommentModel.find({
        idTopic,
      }).populate("idUser");
      return {
        data: comments.map((comment) => new Comment(comment)),
        status: TTCSconfig.STATUS_SUCCESS,
      };
    } catch (error) {
      throw new BadRequestError();
    }
  };
}

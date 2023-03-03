import { Server } from 'http';
import SocketIO from 'socket.io';
import { Comment } from '../submodule/models/comment';
import { UserInfo } from '../submodule/models/user';

let io: SocketIO.Server;

export function initSocket(srv: Server) {
    io = new SocketIO.Server(srv, {
        path: "/api/socketio/"
    });

    io.on("connection", (socket) => {
        socket.on("join_socket", (props: { userInfo: UserInfo }) => {
            socket.join("general_room");
            io.emit("join_socket", `${props.userInfo?.name} connected`);
        });
        socket.on("join_room_comment", (props: { comment: Comment }) => {
            socket.join(`comment_room_${props.comment.idTopic}`);
            io.emit("join_room_comment", `${props.comment?.userInfo?.name} connected in room comment`);
        });
    });

    io.on('disconnect', () => {
        console.log('user disconnected');
    });
}

export const sendCommentSocket = (props: { comment: Comment }) => {
    io.sockets.in(`comment_room_${props.comment.idTopic}`).emit('send-comment', props);
}
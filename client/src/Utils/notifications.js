export function handleLikeNotification(type, response, socket, user) {
  socket?.emit("like talk", {
    sender: user,
    response,
    type,
  });
}
export function handleCommentNotification(type, response, socket, user) {
  socket?.emit("comment talk", {
    sender: user,
    response,
    type,
  });
}

export function handleAttendTalkNotification(type, response, socket, user) {
  socket?.emit("attend talk", {
    sender: user,
    response,
    type,
  });
}
export function handleCancelTalkNotification(type, response, socket, user) {
  socket?.emit("cancel talk", {
    sender: user,
    response,
    type,
  });
}

export const handleHostTalkNotification = (type, response, socket, user) => {
  socket?.emit("create talk", {
    sender: user,
    type,
    response,
  });
};

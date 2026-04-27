module.exports = (io) => {
  io.on("connection", socket => {
    socket.on("join_session", sessionId => {
      socket.join(sessionId);
    });
  });
};
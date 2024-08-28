const SMTPServer = require("smtp-server").SMTPServer

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, cb) {
    console.log("OnConnect", session.id)
    cb()
  },

  onMailFrom(address, session, cb) {
    console.log("OnMailFrom", address.address, session.id)
    cb()
  },

  onRcptTo(address, session, cb) {
    console.log("OnRcpTo", address.address, session.id)
    cb()
  },

  onData(stream, session, cb) {
    stream.on("data", (data) => console.log("Stream Data", data.toString()))
    stream.on("end", () => cb())
  }
})

server.listen(25, () => {
  console.log("listening on port 25")
})

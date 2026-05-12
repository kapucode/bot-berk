module.exports = {
  name: 'clientReady',
  once: true,
  run: (client) => {
    try {
      client.info(`Logged as ${client.user.username}`)
    } catch (err) {
      client.error(err)
    }
  }
}
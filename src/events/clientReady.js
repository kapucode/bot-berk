module.exports = {
  name: 'clientReady',
  once: true,
  run: (client) => {
    console.log(`Logged as ${client.user.username}`)
  }
}
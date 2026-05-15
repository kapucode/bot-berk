class WaitTimeoutError extends Error {
  constructor(message = 'Tempo esgotado') {
    super(message)

    this.name = 'WaitTimeoutError'
  }
}

module.exports = {
  WaitTimeoutError
}
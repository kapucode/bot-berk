```javascript
  module.exports = {
    name: 'eventName',
    once: true, // once é opcional
    run: (client, ...args) => {
      console.log(`O evento disparou!`)
    }
  }
```
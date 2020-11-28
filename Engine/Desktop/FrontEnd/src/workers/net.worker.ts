const ctx: Worker = self as any
console.log('worker')

ctx.postMessage({ foo: 'foo' })
ctx.addEventListener('message', (event) => console.log(event))
export default null as any
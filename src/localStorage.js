export default new class {
  store = {}
  setItem = (key,value) => (this.store[key] = value)
  getItem = key => this.store[key]
  removeItem = key => {delete this.store[key]}
  clear = () => (this.store = {})
  isEmpty = () => (this.store.length == 0)
}()

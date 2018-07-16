import localStorage from './localStorage'

describe('localStorage', () => {
  afterEach = () => {
    localStorage.clear()
  }
  it('should be able to set and get items', () => {
    const key = 'key'
    const value = 'value'
    localStorage.setItem(key,value)
    const retVal = localStorage.getItem(key)
    expect(retVal).toEqual(value)
  })
  it('should remove an item',() => {
    const key = 'key'
    const value = 'value'
    localStorage.setItem(key,value)
    localStorage.removeItem(key)
    const retVal = localStorage.getItem(key)
    expect(retVal).toBeUndefined()
  })
  it('should clear all items', () => {
    const key = 'key'
    const value = 'value'
    localStorage.setItem(key,value)
    localStorage.clear()
    expect(localStorage.store).toEqual({})
  })
})

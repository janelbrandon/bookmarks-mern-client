import localStorage from './localStorage'

describe('localStorage', () => {
  afterAll = () => {
    localStorage.clear()
  }
  it('should be able to set and get Item',() => {
    const value='value'
    const key='key'
    localStorage.setItem(key,value)
    const retItem = localStorage.getItem(key)
    expect(retItem).toEqual(value)
  })
  it('should be able to remove item', () => {
    const value='value'
    const key='key'
    localStorage.setItem(key,value)
    localStorage.removeItem(key)
    const retItem = localStorage.getItem(key)
    expect(retItem).toBeUndefined()
  })
  it('should be able to clear', () => {
    const value='value'
    const key='key'
    localStorage.setItem(key,value)
    const retItem = localStorage.getItem(key)
    expect(retItem).toEqual(value)
    localStorage.clear()
    expect(localStorage.store).toEqual({})
  })
})

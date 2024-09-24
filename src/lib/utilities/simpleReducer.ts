export function simpleReducer<T extends { id: string }>(
  state: Array<T>,
  action: { type: 'add' | 'remove'; value: T },
): Array<T> {
  switch (action.type) {
    case 'add':
      return [...new Set([...state, action.value])]
    case 'remove':
      return state.filter((item) => !(action.value.id === item.id))
    default:
      throw new Error()
  }
}

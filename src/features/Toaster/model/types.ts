export type TypeToast = {
  type: 'green' | 'yellow' | 'red' | 'loading'
  message: string
  id: number
}

export type TypeToastPayload = Omit<TypeToast, 'id'> & {
  id?: number
}

export type TypeInitialState = {
  toasts: TypeToast[]
}

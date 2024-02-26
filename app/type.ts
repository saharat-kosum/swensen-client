export interface UserType {
  id?: number
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  date_of_birth: string | null
  gender: string
  create_ts: Date
}

export interface ProductType {
  id?: number
  name: string
  price: number
  create_ts: Date
  modify_ts: Date
}

export interface AddPostPayload {
  name: string
  price: number
}
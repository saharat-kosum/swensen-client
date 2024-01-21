export interface UserType {
  id?: number
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  date_of_birth: string | null
  gender: string
}

export interface ProductType {
  id: number
  name: string
  price: number
  description: string | null
}
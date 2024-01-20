export interface UserType {
  id: number
  first_name: String
  last_name: String
  phone: String
  email: String
  password: String
  date_of_birth: String | null
  gender: String | null
}

export interface ProductType {
  id: number
  name: String
  price: number
  description: String | null
}
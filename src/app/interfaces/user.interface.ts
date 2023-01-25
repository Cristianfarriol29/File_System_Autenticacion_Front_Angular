

export interface RegisterData {
  name: string,
  surname: string,
  password: string,
  email: string
}

interface RegisterResponse {
  name: string,
  email: string,
  surname: string,
  password: string,
  token: string
}

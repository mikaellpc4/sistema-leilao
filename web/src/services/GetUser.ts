import { AxiosError, AxiosResponse } from "axios"
import Api, { AxiosApi } from "./Api"

interface GetUserResponse {
  userData: {
    id: string,
    name: string,
    email: string,
    LCoins: number,
    role: string
  }
}

const GetUser = async () => {
  try {
    const res = await Api.get<GetUserResponse>('/authenticate')
    const user = res.userData
    return user
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response?.data)
      return e
    }
  }
  return null
}

export default GetUser

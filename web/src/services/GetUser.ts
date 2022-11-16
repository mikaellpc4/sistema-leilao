import { AxiosError, AxiosResponse } from "axios"
import Api from "./Api"

interface IUser {
  id: string,
  name: string,
  email: string,
  LCoins: number,
  role: string
}

const GetUser = async () => {
  try {
    const res = await Api.get('/authenticate')
    if (res.status === 200) {
      const user = res.data.userData as IUser
      return { user, status: 'user' }
    }
    if (res.status === 202) {
      if (res.data.newAcessToken) {
        const { newAcessToken } = res.data as { newAcessToken: string }
        return { newAcessToken, status: 'newAcessToken' }
      }
      if (res.data.newRefreshToken) {
        const { newRefreshtoken } = res.data as { newRefreshtoken: string }
        return { newRefreshtoken, status: 'newRefreshToken' }
      }
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response?.data)
      return e
    }
  }
  return null
}

export default GetUser

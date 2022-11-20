import axios, { Axios, AxiosError } from "axios"

export const AxiosApi = axios.create({
  baseURL: 'http://localhost:3333'
})

type tokens = { newAcessToken?: string, newRefreshToken?: string }

const renewTokens = async ({ newAcessToken, newRefreshToken }: tokens) => {
  let acessToken = newAcessToken
  if (newRefreshToken) {
    AxiosApi.defaults.headers['refreshtoken'] = newRefreshToken
    const res = await AxiosApi.get('/authenticate')
    if (res.status === 202) {
      acessToken = res.data.newAcessToken
    }
  }
  if (acessToken) {
    AxiosApi.defaults.headers['acesstoken'] = acessToken
  }
}

const Api = {
  get: async<T>(url: string): Promise<T> => {
    let res = await AxiosApi.get(url)
    if (res.status === 202) {
      const { newAcessToken, newRefreshToken } = res.data as tokens
      await renewTokens({ newAcessToken, newRefreshToken })
      res = await AxiosApi.get(url)
    }
    return res.data as T
  },
  post: async <T, K>(url: string, data?: T): Promise<K> => {
    let res = await AxiosApi.post(url, data)
    if (res.status === 202) {
      const { newAcessToken, newRefreshToken } = res.data as tokens
      await renewTokens({ newAcessToken, newRefreshToken })
      res = await AxiosApi.post(url, data)
    }
    return res.data as K
  }
}

export default Api

import { useState, useEffect } from 'react'
import Api from "./Api";

const getServerSideProps = <T = unknown>(url: string) => {

  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    Api.get(url)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e))
      .finally(() => setIsFetching(false))
  }, [])

  return { data, isFetching }
}

export default getServerSideProps

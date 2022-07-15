import axios from 'axios'

export default async function swrFetcher(args) {
    const res = await axios.get(args)
    // setLoading(false)
    return res.data
}

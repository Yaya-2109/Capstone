import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  try {

    const { data } = await axios.get('/api/locations', {
      params: {
        type,
        sw,
        ne
      }
    })

    return data

  } catch (error) {
    console.log(error)
  }
}

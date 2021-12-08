import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  try {

    console.log(type)
    const { data } = await axios.get('/api/locations', {
      params: {
        type,
        sw,
        ne
      }
    })

    console.log(data)
    return data

  } catch (error) {
    console.log(error)
  }
}

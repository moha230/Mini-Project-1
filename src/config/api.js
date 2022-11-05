export const heading = "currency exchange app - react"
export const API_DOMAIN = "https://api.fastforex.io/"
export const API_HEADER = '651c67e586-b0212c5d16-rktpq2'

export const endpointPath = (from, to, amount) =>{
    const options = {
        method: 'GET',
        url: `${API_DOMAIN}/convert?from=${from}&to=${to}&amount=${amount}&api_key=${API_HEADER}`
      };
    return options
}
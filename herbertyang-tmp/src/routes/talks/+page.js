export const load = async ({ fetch }) => {
    const response = await fetch(`/api-ic/talks`)
    const posts = await response.json()
  
    return {
      posts
    }
}
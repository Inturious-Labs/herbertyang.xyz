export const load = async ({ fetch }) => {
    const response = await fetch(`/api-ic/posts`)
    const posts = await response.json()
  
    return {
      posts
    }
}
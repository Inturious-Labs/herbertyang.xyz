export const prerender = true

export async function load({ params }){
    const post = await import(`../${params.slug}.md`)
    const { title, date, tw_card_type, tw_card_desc, tw_card_image } = post.metadata
    const content = post.default
  
    return {
      content,
      title,
      date,
      tw_card_type,
      tw_card_desc,
      tw_card_image
    }
}
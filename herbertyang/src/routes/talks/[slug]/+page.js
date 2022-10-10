export async function load({ params }){
    const talk = await import(`../${params.slug}.md`)
    const { title, date, tw_card_type, tw_card_desc, tw_card_image } = talk.metadata
    const content = talk.default
  
    return {
      content,
      title,
      date,
      tw_card_type,
      tw_card_desc,
      tw_card_image
    }
}
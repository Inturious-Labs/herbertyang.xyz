import { fetchMarkdownTalks } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const prerender = true

export const GET = async () => {
  const allTalks = await fetchMarkdownTalks()

  const sortedPosts = allTalks.sort((a, b) => {
    return new Date(b.meta.date) - new Date(a.meta.date)
  })

  return json(sortedPosts)
}
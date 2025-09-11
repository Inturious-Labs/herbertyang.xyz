import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'

export default function BlogPostItemWrapper(props) {
  // Simply return the original BlogPostItem without Disqus comments
  return <BlogPostItem {...props} />
}
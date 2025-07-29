import React, { useEffect, useRef } from 'react'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import BlogPostItem from '@theme-original/BlogPostItem'

export default function BlogPostItemWrapper(props) {
  const { metadata } = useBlogPost()
  const disqusRef = useRef(null)
  
  // Only show comments if the blog post has comments enabled
  const showComments = metadata?.comments !== false
  
  useEffect(() => {
    if (showComments && metadata && disqusRef.current) {
      // Load Disqus script if not already loaded
      if (!window.DISQUS) {
        const script = document.createElement('script')
        script.src = 'https://herbertyang.disqus.com/embed.js'
        script.setAttribute('data-timestamp', +new Date())
        script.async = true
        document.head.appendChild(script)
      } else {
        // If Disqus is already loaded, reload it
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = metadata.permalink
            this.page.url = metadata.permalink
            this.page.title = metadata.title
          }
        })
      }
    }
  }, [showComments, metadata])
  
  return (
    <>
      <BlogPostItem {...props} />
      {showComments && metadata && (
        <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #eaecef' }}>
          <h3>Comments</h3>
          <div id="disqus_thread" ref={disqusRef}></div>
          <noscript>
            Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
          </noscript>
        </div>
      )}
    </>
  )
}
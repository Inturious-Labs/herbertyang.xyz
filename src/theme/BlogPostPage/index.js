import React from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import TOC from '@theme/TOC';
import ContentVisibility from '@theme/ContentVisibility';
import BrowserOnly from '@docusaurus/BrowserOnly';

function RapportComments() {
  return (
    <BrowserOnly>
      {() => {
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };

        React.useEffect(() => {
          (async () => {
            try {
              await loadScript('https://kdcro-gqaaa-aaaai-q34gq-cai.icp0.io/ic-agent-bundle.js');
              await loadScript('https://kdcro-gqaaa-aaaai-q34gq-cai.icp0.io/ic-agent.js');
              await loadScript('https://kdcro-gqaaa-aaaai-q34gq-cai.icp0.io/widget.js?v=1.0.0');

              if (window.Rapport) {
                window.Rapport.init({
                  canisterId: 'kedx2-liaaa-aaaai-q34ga-cai'
                });
              }
            } catch (err) {
              console.error('Failed to load Rapport:', err);
            }
          })();
        }, []);

        return <div id="rapport"></div>;
      }}
    </BrowserOnly>
  );
}

function BlogPostPageContent({sidebar, children}) {
  const {metadata, toc} = useBlogPost();
  const {nextItem, prevItem, frontMatter} = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;

  const shouldShowRapport = frontMatter?.enable_rapport === true;

  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }>
      <ContentVisibility metadata={metadata} />

      <BlogPostItem>{children}</BlogPostItem>

      {shouldShowRapport && (
        <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <RapportComments />
        </div>
      )}

      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}

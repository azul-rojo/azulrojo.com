"use client"
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { CustomMarkdown } from '../CustomMakrdown';
import { Page } from '../Page';

interface PageMarkdownProps {
  mdSource: string;
}

// a page that renders markdown
export const PageMarkdown = ({ mdSource }: PageMarkdownProps) => {
  const [content, setContent] = useState('');
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    fetch(mdSource)
      .then(res => res.text())
      .then((t) => {
        setContent(t as unknown as string);
      })
  }, [mdSource])

  return <Page theme={theme}>
    <CustomMarkdown theme={theme}>{content}</CustomMarkdown>
  </Page>
}

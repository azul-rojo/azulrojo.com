import classNames from 'classnames';
import { Theme } from '../../constants/theme';
import { Heading } from '../Heading';
import { Line } from '../Line';
import { AppLink } from '../Link';
import { Text } from '../Text';
import styles from './styles.module.scss';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { ListItem, UnorderList } from '../List';

interface CustomMarkdownProps {
  children: TinaMarkdownContent;
  theme: Theme
  className?: string;
}

export const CustomMarkdown = ({ children, className, theme }: CustomMarkdownProps) => {
  const componentClassName = classNames(className, styles.component);

  return <TinaMarkdown
    // key is needed to trigger a rerender when theme changes
    key={theme}
    components={{
      h1: (props) => {
      return <Heading className={componentClassName} theme={theme}>{props?.children}</Heading>
      },
      h2(props) {
        return <Heading className={componentClassName} theme={theme} headingType='h2'>{props?.children}</Heading>
      },
      hr() {
        return <Line className={componentClassName} theme={theme}></Line>
      },
      p(props) {
        return <Text className={componentClassName} theme={theme}>{props?.children}</Text>
      },
      a(props) {
        const href = props?.url;
        const children = props?.children;

        // this might be confusing since we are using react router and hashes.
        // so on mds we need to be consistent on using links with hashes (internal)
        const isInternalLink = !!(href && href.startsWith('/'));

        return <AppLink isInternal={isInternalLink} href={href || ''} theme={theme}>{children}</AppLink>
      },
      ul(props) {
        return <UnorderList theme={theme}>{props?.children}</UnorderList>
      },
      li(props) {
        return <ListItem theme={theme}>{props?.children}</ListItem>
      }
  }}
    content={children} />

}

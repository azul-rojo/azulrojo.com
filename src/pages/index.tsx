import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaQuery } from "@/interface/tina";
import { Layout } from "@/component/Layout";
import { CustomMarkdown } from "@/component/CustomMakrdown";
// import { useContext } from "react";
import { GlobalContext } from "@/GlobalContext";
import { Page } from "@/component/Page";

interface Home {
  posts: {
    title: string;
    category: string;
    isDraft: boolean | null;
    body: TinaMarkdownContent;
  }
}

type HomeData = Home;
type HomeProps = TinaQuery<HomeData>;

export default function Home(props: HomeProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      {/* Although this isnt recommended, I found this way having a consumer updates the context "theme" */}
      <GlobalContext.Consumer>
        {({ theme }) => 
          <Page theme={theme}>
            <CustomMarkdown theme={theme}>{data.posts.body}</CustomMarkdown>
          </Page>
        }
      </GlobalContext.Consumer>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.posts({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};

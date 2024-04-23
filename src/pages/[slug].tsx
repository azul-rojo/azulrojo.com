import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaQuery } from "@/interface/tina";
import { Layout } from "@/component/Layout";
import { CustomMarkdown } from "@/component/CustomMakrdown";
import { GlobalContext } from "@/GlobalContext";
import { Page } from "@/component/Page";

interface Post {
  posts: {
    title: string;
    category: string;
    isDraft: boolean | null;
    body: TinaMarkdownContent;
  }
}

type PostData = Post;
type PostProps = TinaQuery<PostData>;

export default function Post(props: PostProps) {
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
export const getStaticPaths = async () => {
  const { data } = await client.queries.postsConnection();

  if (!data?.postsConnection?.edges) throw new Error("driverconnection edges not found");

  const paths = data.postsConnection.edges.map((x) => {
    if (!x?.node) throw new Error("node does not exist in driverconnection");

    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx: any) => {
  const { data, query, variables } = await client.queries.posts({
    relativePath: ctx.params.slug + ".mdx"
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};

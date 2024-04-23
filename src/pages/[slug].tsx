import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaQuery } from "@/interface/tina";
import { Layout } from "@/component/Layout";
import { CustomMarkdown } from "@/component/CustomMakrdown";
import { GlobalContext } from "@/GlobalContext";
import { Page } from "@/component/Page";
import { MenuSection, Navbar } from "@/component/Menu";

interface Post {
  posts: {
    title: string;
    category: string;
    isDraft: boolean | null;
    body: TinaMarkdownContent;
  }
}

type NavbarData = { navbar: Navbar; };
type PostData = Post;
type PostProps = TinaQuery<PostData> & {
  sectionsList: MenuSection[];
  dataNav: NavbarData;
  queryNav: string;
  variablesNav: {
    relativePath: string;
  }
};

export default function Post(props: PostProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { data: dataNav } = useTina({
    query: props.queryNav,
    variables: props.variablesNav,
    data: props.dataNav,
  });

  const {
    title,
  } = dataNav.navbar;

  return (
    <Layout
      menuTitle={title}
      linkSections={props.sectionsList}
    >
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

  if (!data?.postsConnection?.edges) throw new Error("postConnection edges not found");

  const paths = data.postsConnection.edges.map((x) => {
    if (!x?.node) throw new Error("node does not exist in postConnection");

    const filename = x.node._sys.filename;

    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx: any) => {
  const filename = ctx.params.slug;
  const { data, query, variables } = await client.queries.posts({
    relativePath: filename + ".mdx"
  });
  const navbar = await client.queries.navbar({
    relativePath: "navbar.mdx"
  });

  const { data: postConnectionData } = await client.queries.postsConnection();
  // create post sections by category of post
  // TODO: create function for this logic. we can then extend it to sort it
  const sections: { [category: string]: unknown[]}= {};
  postConnectionData?.postsConnection?.edges?.forEach((edge) => {
    const category = edge?.node?.category || "";
    const text = edge?.node?.title || "";
    const href = "/" + (edge?.node?._sys.filename === 'home' ? "" : edge?.node?._sys.filename || "");

    const post = {
      text,
      href
    };

    if (sections[category]) sections[category].push(post);
    else sections[category] = [post];
  });

  const sectionsList = Object.keys(sections).map((s) => {
    const section = sections[s];
    const title = s === 'main' ? '' : s;

    return {
      title,
      links: section
    };
  });

  // join navbar section and post sections
  const allSections = [...sectionsList, ...navbar.data.navbar.sections || []].sort((a, b) => {
    if (a?.title === '') return -1;
    else return 0
  });


  return {
    props: {
      data,
      query,
      variables,
      dataNav: navbar.data,
      queryNav: navbar.query,
      variablesNav: navbar.variables,
      sectionsList: allSections
    },
  };
};

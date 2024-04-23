import { Collection } from "tinacms";

export const Posts: Collection = {
  label: "Posts",
  name: "posts",
  path: "content/posts",
  format: "mdx",
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      label: "Category",
      name: "category",
      type: "string",
    }, 
    {
      label: "Is Draft",
      name: "isDraft",
      type: "boolean",
    },
    {
      label: "body",
      name: "body",
      type: "rich-text",
      isBody: true,
    }
  ],
}

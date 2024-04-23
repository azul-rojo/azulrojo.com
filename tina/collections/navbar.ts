import { Collection } from "tinacms";

export const Navbar: Collection = {
  label: "Navbar",
  name: "navbar",
  path: "content",
  format: "mdx",
  match: {
    include: "navbar"
  },
  fields: [
    {
      label: "Show Drafts",
      name: "showDrafts",
      type: "boolean",
    },
    {
      label: "Title",
      name: "title",
      type: "string"
    },
    {
      label: "Sections",
      name: "sections",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item.title}` };
        },
      },
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
        },
        {
          label: "Links",
          name: "links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item.text}` };
            },
          },
          fields: [
            {
              label: "Text",
              name: "text",
              type: "string"
            },
            {
              label: "href",
              name: "href",
              type: "string",
            }
          ]
        }
      ]
    }
  ],
}

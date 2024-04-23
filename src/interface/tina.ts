export interface _sys {
  filename: string;
  basename: string;
  path: string;
  relativePath: string;
  extension: string;
}

export interface TinaQuery<d> {
  query: string;
  variables: {
    relativePath: string;
  };
  data: d
}

// types/mdx.d.ts
declare module 'gatsby-plugin-mdx' {
  let MDXComponent: (props: any) => JSX.Element
  let MDXRenderer: (props: any) => JSX.Element
  export { MDXComponent, MDXRenderer }
  export default MDXComponent
}

declare module '@mdx-js/react' {
  let MDXProvider: (props: {
    children: JSX.Element
    components: { [key: string]: (props: any) => JSX.Element }
  }) => JSX.Element
}

interface Window {
  MathJax: any
}

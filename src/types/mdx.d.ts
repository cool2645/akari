// types/mdx.d.ts
declare module 'gatsby-mdx' {
  let MDXComponent: (props: any) => JSX.Element
  let MDXRenderer: (props: any) => JSX.Element
  export { MDXComponent, MDXRenderer }
  export default MDXComponent
}

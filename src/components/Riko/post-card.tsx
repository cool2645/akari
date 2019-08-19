import { Link } from 'gatsby';
import * as React from 'react';
import Card from './card'
import styles from './post-card.module.styl';

interface PostCardProps {
  time: string
  title: string
  excerpt: string
  slug: string
}

export default (props: PostCardProps) => {
  return <Card time={props.time} via="2645 实验室" href={`/posts/${props.slug}`}>
    <Link to={`/posts/${props.slug}`}><h3 className={styles.h3}>{ props.title }</h3></Link>
    <p>{ props.excerpt }</p>
  </Card>
}

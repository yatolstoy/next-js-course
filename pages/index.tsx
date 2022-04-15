import type { NextPage } from 'next'
import { Button, Htag, P, Tag } from '../components';

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearance='primary' arrow='right'>Примари кнопка</Button>
      <Button appearance='ghost'  arrow='right'>Секондари кнопка</Button>
      <P>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi totam accusamus ullam. Magni maxime sed molestiae officiis eaque ipsum tempore eos velit? Sunt velit consequatur iste ducimus temporibus rem in?</P>
      <Tag size='sm' color='gray'>Some Text</Tag>
      <Tag size='md' color='red'>Some Text</Tag>
      <Tag size='sm' color='green'>Some Text</Tag>
      <Tag size='md' color='ghost'>Some Text</Tag>
      <Tag size='sm' color='primary'>Some Text</Tag>
    </>
  )
}

export default Home

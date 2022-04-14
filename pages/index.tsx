import type { NextPage } from 'next'
import { Button, Htag } from '../components';

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearance='primary' arrow='right'>Примари кнопка</Button>
      <Button appearance='ghost'  arrow='right'>Секондари кнопка</Button>
    </>
  )
}

export default Home

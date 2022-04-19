import type { GetStaticProps } from 'next'
import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

const Home: React.FC<HomeProps> = ({menu}) => {
  const [rating, changeRating] = useState(4);

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
      <Rating rating={rating} isChangable={true} changeRating={ changeRating } />
      <ul>
        {menu.map((el, i) => (<li key={i}>{el._id.secondCategory}</li>))}
      </ul>
      
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  })
  
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
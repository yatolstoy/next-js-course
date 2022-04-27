import { Htag } from '../components';
import { withLayout } from '../layout/Layout';

export const Error404= () => {
  return (
    <>
      <Htag tag="h1">404. Страница не найдена</Htag>
    </>
  )
}

export default withLayout(Error404)
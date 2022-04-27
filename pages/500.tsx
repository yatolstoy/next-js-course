import { Htag } from '../components';
import { withLayout } from '../layout/Layout';

const Error500= () => {
  return (
    <>
      <Htag tag="h1">500. Что-то с сервером. Попробуйте чуть позже.</Htag>
    </>
  )
}

export default withLayout(Error500)
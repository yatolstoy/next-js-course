import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext)

	return (
		<div>
      <ul>
        {menu.map((el, i) => (<li key={i}>{el._id.secondCategory}</li>))}
      </ul>
		</div>
	)
}

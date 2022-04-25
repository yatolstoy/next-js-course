import cn from 'classnames';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import UpIcon from './Up.svg'
import { ButtonIcon } from '../index';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({opacity: y / document.body.scrollHeight })
	}, [y, controls])

	const scrollToTop = () => {
		window.scrollTo({
			top:0,
			behavior: 'smooth'
		})
	}
	
	return (
		<ButtonIcon color={'primary'} onClick={scrollToTop} animate={controls} initial={ { opacity: 0 } }>
			<UpIcon />
		</ButtonIcon>
	)
}

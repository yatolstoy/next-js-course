import cn from 'classnames';
import styles from './Up.module.css'
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
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
		<motion.div 
			animate={controls} 
			className={styles.up} 
			initial={ { opacity: 0 } }
			onClick={scrollToTop} 
		>
			<ButtonIcon 
				color={'primary'} 
				icon={'up'}
				aria-label="Наверх"
			/>
		</motion.div>

	)
}

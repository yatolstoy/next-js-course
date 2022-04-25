import { HeaderProps } from './Header.props'
import cn from 'classnames';
import styles from './Header.module.css';
import Logo from '../logo.svg'
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	},[router])

	const variants = {
		hidden: {
			opacity: 1,
			x: "100%",
			transition: {
				stiffness: 20
			}
		},
		show: {
			opacity: 1,
			x: 0
		}
	}
	
	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo/>
			<ButtonIcon icon={'menu'} color={'white'} onClick={() => setIsOpened(true)}/>
			<motion.div 
				className={styles["mobile-menu"]} 
				variants={variants}
				initial='hidden'
				animate={isOpened ? 'show' : 'hidden'} >
				<Sidebar />
				<ButtonIcon className={styles['menu-close']} icon={'close'} color={'white'} onClick={() => setIsOpened(false)}/>
			</motion.div>
		</header>
	)
}

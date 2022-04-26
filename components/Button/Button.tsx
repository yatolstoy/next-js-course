import { ButtonProps } from './Button.props'
import styles from './Button.module.css'
import cn from 'classnames';
import ArrowIcon from './arrow.svg'
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export const Button = ({appearance, children, arrow = 'none', className, ...props}: ButtonProps): JSX.Element => {
			return (
			<motion.button
				whileHover={{scale: 1.05}}
				className={cn(styles.button, className, {
					[styles.primary]: appearance === 'primary',
					[styles.ghost]: appearance === 'ghost',
				})}
				{...props}
			>
				{children}
				{arrow !== 'none' && <span className={cn(styles.arrow, {
					[styles.down]: arrow === 'down',
					[styles.right]: arrow === 'right'
				})}>
					<ArrowIcon />
					</span>}
			</motion.button>
			)
}
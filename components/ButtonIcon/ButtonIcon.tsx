import { ButtonIconProps } from './ButtonIcon.props'
import styles from './ButtonIcon.module.css'
import cn from 'classnames';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';

const ButtonComponent = forwardRef(({children, className, color='primary', ...props}: ButtonIconProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
			return (
			<button 
				className={cn(styles.button, className, {
					[styles.primary]: color === 'primary',
					[styles.white]: color === 'white',
				})} 
				ref={ref}
				{...props}
			>
				{children}
			</button>
			)
});

ButtonComponent.displayName = 'BottonComponent'

export const ButtonIcon = motion(ButtonComponent);

import { ButtonIconProps, icons } from './ButtonIcon.props'
import styles from './ButtonIcon.module.css'
import cn from 'classnames';

export const ButtonIcon = ({icon, className, color='primary', ...props}: ButtonIconProps): JSX.Element => {
	const IconComp = icons[icon];
	return (
			<button 
				className={cn(styles.button, className, {
					[styles.primary]: color === 'primary',
					[styles.white]: color === 'white',
				})}
				{...props}
			>
				<IconComp />
			</button>
			)
};

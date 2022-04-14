import { PProps } from './P.props'
import cn from 'classnames';
import styles from './P.module.css';

export const P = ({children, size = 'md', className, ...props}: PProps): JSX.Element => {
	return (
	<p className={cn(styles.p, className, {
		[styles.small]: size === 's',
		[styles.medium]: size === 'md',
		[styles.large]: size === 'lg',
	})}
	{...props}>{children}</p>
	)
}

import { TagProps } from './Tag.props'
import cn from 'classnames';
import styles from './Tag.module.css'

export const Tag = ({children, size, color, href, className, ...props}: TagProps): JSX.Element => {
	return (
	<div {...props} className={cn(styles.tag, className, {
		[styles.small]: size === 'sm',
		[styles.medium]: size === 'md',
		[styles.ghost]: color === 'ghost',
		[styles.primary]: color === 'primary',
		[styles.red]: color === 'red',
		[styles.green]: color === 'green',
		[styles.gray]: color === 'gray',
	})}>
		{
			href ? <a href={href}>{children}</a> : <>{children}</>
		}
	</div>
	)
}
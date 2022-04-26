import { SortEnum, SortProps } from './Sort.props'
import cn from 'classnames';
import styles from './Sort.module.css';
import SortIcon from './Sort.svg'
import { KeyboardEvent } from 'react'

export const Sort = ({ sort, setSort, className, ...props}: SortProps): JSX.Element => {
	
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<button 
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
			>

				<SortIcon className={styles['sort-icon']}/> По рейтингу
			</button>

			<button 
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
			>

				<SortIcon className={styles['sort-icon']}/> По цене
			</button>
		</div>
	)
}

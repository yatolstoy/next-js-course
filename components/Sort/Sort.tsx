import { SortEnum, SortProps } from './Sort.props'
import cn from 'classnames';
import styles from './Sort.module.css';
import SortIcon from './Sort.svg'

export const Sort = ({ sort, setSort, className, ...props}: SortProps): JSX.Element => {
	
	return (
		<div className={cn(styles.sort, className)} {...props} id="sort" aria-label="сортировка">
			
			<button 
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
				id='rating'
				aria-labelledby='sort rating'
				aria-selected={sort === SortEnum.Rating}
			>

				<SortIcon className={styles['sort-icon']}/> По рейтингу
			</button>

			<button 
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
				aria-selected={sort === SortEnum.Price}
			>

				<SortIcon className={styles['sort-icon']}/> По цене
			</button>
		</div>
	)
}

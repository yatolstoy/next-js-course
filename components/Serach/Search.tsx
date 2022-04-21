import { SearchProps } from './Search.props'
import cn from 'classnames';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { useState } from 'react';
import { Button } from '../Button/Button';
import SearchIcon from './search.svg'
import { useRouter } from 'next/router';

export const Search = ({children, className, ...props}: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch =() => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		})
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if(e.key === 'Enter') {
			goToSearch();
		}
	}

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input className={styles.input} placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeydown}/>
			<Button appearance='primary' className={styles.button} onClick={goToSearch}>
				<SearchIcon />
			</Button>
		</div>
	)
}
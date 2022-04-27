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

	const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter') {
			goToSearch();
		}
	}

	return (
		<form className={cn(className, styles.search)} {...props} role="search">
			<Input 
				className={styles.input} 
				placeholder='Поиск...' 
				value={search} 
				onChange={(e) => setSearch(e.target.value)} 
				onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleKeydown(e)}
			/>
			<Button 
				appearance='primary' 
				className={styles.button} 
				onClick={goToSearch}
				aria-label="Искать по сайту"
			>
				<SearchIcon />
			</Button>
		</form>
	)
}

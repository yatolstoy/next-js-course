import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import BooksIcon from './icons/books.svg'
import GiftsIcon from './icons/gifts.svg'
import { TopLevelCategory } from '../../interfaces/page.interface';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: "Товары", icon: <GiftsIcon />, id: TopLevelCategory.Products },
]

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext)

	const buildFirstLevel = () => {
		return (
		<>
			{firstLevelMenu.map(m => (
				<div key={m.id}>
					<a href={`/${m.route}`}>
						<div className={cn(styles['first-level'], {
							[styles['first-level-active']]: m.id == firstCategory
						})}>
							{m.icon}
							<span>{m.name}</span>
						</div>
					</a>
					{m.id == firstCategory && buildSecondLevel(m)}
				</div>
			))}
		</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles['second-block']}>
				{menu.map(el => (
					<div key={el._id.secondCategory}>
						<div className={styles['second-level']}>
							{el._id.secondCategory}
						</div>
						<div className={cn(styles['second-level-block'], {
							[styles['second-level-block-opened']]: el.isOpened
						})}>
							{ buildThirdLevel(el.pages, menuItem.route)}
						</div>
					</div>
				))}
			</div>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => {
				return (
					<a key={p.alias} href={`/${route}/${p.alias}`} className={cn(styles['third-level'], {
						[styles['third-level-active']]: false
					})}>
						{p.category}
					</a>
				)
			}))
	}

	return (
		<div className={styles.menu}>
      <ul>
        {buildFirstLevel()}
      </ul>
		</div>
	)
}

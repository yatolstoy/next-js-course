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
import Link from 'next/link';
import { useRouter } from 'next/router';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: "Товары", icon: <GiftsIcon />, id: TopLevelCategory.Products },
]

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext)
	const router = useRouter();

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if(m._id.secondCategory == secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		}))
	}

	const buildFirstLevel = () => {
		return (
		<>
			{firstLevelMenu.map(m => (
				<div key={m.id}>
					<Link href={`/${m.route}`}>
						<a>
							<div className={cn(styles['first-level'], {
								[styles['first-level-active']]: m.id == firstCategory
							})}>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</a>	
					</Link>

					{m.id == firstCategory && buildSecondLevel(m)}
				</div>
			))}
		</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles['second-block']}>
				{ menu.map(el => {
						if(el.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
							el.isOpened = true;
						}
						return (
						<div key={el._id.secondCategory}>
							<div className={styles['second-level']} onClick={() => openSecondLevel(el._id.secondCategory)}>
								{el._id.secondCategory}
							</div>
							<div className={cn(styles['second-level-block'], {
								[styles['second-level-block-opened']]: el.isOpened
							})}>
								{ buildThirdLevel(el.pages, menuItem.route)}
							</div>
						</div>
					)})
				}
			</div>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => {
				return (
					<Link key={p.alias} href={`/${route}/${p.alias}`}>
						<a className={cn(styles['third-level'], {
							[styles['third-level-active']]: `/${route}/${p.alias}` == router.asPath
						})}>
							{p.category}
						</a>					
					</Link>

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

import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';

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

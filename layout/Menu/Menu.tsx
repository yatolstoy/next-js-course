import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { m, motion, useReducedMotion } from 'framer-motion'

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext)
	const router = useRouter();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				staggerChildren: 0.1,
				type: 'spring'
			}
		},
		hidden: {
			marginBottom: 0
		}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: '100%',
			transition: {
				type: "tween"
			}
		},
		hidden: {
			opacity: shouldReduceMotion ? 1 : 0,
			height: "0px"
		}
	}

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if(m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened')
				m.isOpened = !m.isOpened;
			}
			return m;
		}))
	}

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if(['Space', 'Enter'].includes(key.code)) {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	}

	const buildFirstLevel = () => {
		return (
		<ul className={styles['first-level-list']}>
			{firstLevelMenu.map(m => (
				<li aria-expanded={(m.id == firstCategory)} key={m.id}>
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
				</li>
			))}
		</ul>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles['second-block']}>
				{ menu.map(el => {
						if(el.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
							el.isOpened = true;
						}
						return (
						<li key={el._id.secondCategory}>
							<button 
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, el._id.secondCategory)} 
								className={styles['second-level']} 
								onClick={() => openSecondLevel(el._id.secondCategory)}
								aria-expanded={el.isOpened}
							>
								{el._id.secondCategory}
							</button>
							<motion.ul 
								layout
								variants={variants}
								initial={el.isOpened ? 'visible' : 'hidden'}
								animate={el.isOpened ? 'visible' : 'hidden'}
								className={cn(styles['second-level-block'])}
							>
								{ buildThirdLevel(el.pages, menuItem.route, el.isOpened ?? false)}
							</motion.ul>
						</li>
					)})
				}
			</ul>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => {
				return (
					<motion.li variants={variantsChildren} key={p.alias}>
						<Link href={`/${route}/${p.alias}`}>
							<a 
								tabIndex={isOpened ? 0 : -1} 
								className={cn(styles['third-level'], {
									[styles['third-level-active']]: `/${route}/${p.alias}` == router.asPath
								})}
								aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
							>
								{p.category}
							</a>					
						</Link>
					</motion.li>
				)
			}))
	}

	return (
		<nav className={styles.menu} role="navigation">
			{
				announce && 
				<span role='log' className='visually-hidden'>
					{
						announce == 'opened' ? 'Развёрнуто' : 'свёрнуто'
					}
				</span>
			}
        {buildFirstLevel()}
		</nav>
	)
}

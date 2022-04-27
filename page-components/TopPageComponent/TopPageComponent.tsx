import { HHData, Htag, Product, Sort, Tag, Up } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css'
import { TopLevelCategory } from '../../interfaces/page.interface';
import CheckIcon from './check.svg'
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from '../../components/Sort/sort.reducer';
import { useScrollY } from '../../hooks/useScrollY';

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps):JSX.Element => {
	const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});
	const y = useScrollY()

	const setSort = (sort: SortEnum) => (
		dispatchSort({type: sort})
	)

	useEffect(() => {
		dispatchSort({type: 'reset', initialState: products})
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag={'h1'}>{page.title}</Htag>
				{sortedProducts && 
					<Tag 
						color='gray' 
						size='md'
						aria-label={products.length + ' элементов'}
					>{sortedProducts.length}</Tag>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedProducts && sortedProducts.map(p => (<Product role='listitem' layout product={p} key={p._id}></Product>))}
			</div>

			{ firstCategory === TopLevelCategory.Courses && 
			<>
				<div className={styles.hhTitle}>
					<Htag tag={'h2'}>Вакансии {page.category}</Htag>
					<Tag color='red' size='md'>hh.ru</Tag>
				</div>
				{page.hh && <HHData {...page.hh} /> }
			</>}
			
			{ page?.advantages && 
				<div className={styles.advantages}>
					<Htag tag='h3'>Преимущества</Htag>
					
					<ul className={styles['advantage-list']}>
						{page.advantages.map(adv => (
							<li className={styles['advantage-list-item']} key={adv._id}>
								<div className={styles['advantage-item-header']}>
									<div className={styles['check-wrapper']}>
										<CheckIcon />
									</div>
									
									<p className={styles['advantage-item-title']}>{adv.title}</p>
								</div>
								
								<p className={styles['advantage-item-description']}>{adv.description}</p>
							</li>
						))}
					</ul>
				</div>
			}
			{ page?.seoText &&
				<div dangerouslySetInnerHTML={{__html: page.seoText}} className={styles['seo-text']}></div>
			}
			{ page?.tags &&
				<>
				<Htag tag="h3">{page.tagsTitle}</Htag>
				<ul className={styles['tags-list']}>
					{page.tags.map((tag, i) => (
						<li key={ i} >
							<Tag color={'primary'} size={'sm'}>{ tag }</Tag>
						</li>
					))}
					
				</ul>
				</>

			}
		{<Up/>}
		</div>
	);
}

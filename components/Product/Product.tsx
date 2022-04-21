import { ProductProps } from './Product.props'
import cn from 'classnames';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image'

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<Image 
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
					alt={product.title} 
					width={70} 
					height={70}/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>
				{priceRu(product.price)}
				{product.oldPrice && <Tag className={styles['old-price']} color={'green'} size={'sm'}>{priceRu(product.price - product.oldPrice)}</Tag>}
			</div>

			<div className={styles.credit}>{priceRu(product.credit)}/<span>мес.</span></div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{
					product.categories.map(c => (<Tag key={c} color='ghost' className={styles.tag}>{c}</Tag>))
				}
			</div>
			<div className={styles['price-title']}>цена</div>
			<div className={styles['credit-title']}>кредит</div>
			<div className={styles['rate-title']}> {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
			<div className={styles.description}> {product.description}</div>
			<Divider className={styles.hr}></Divider>
			<div className={styles.feature}>
				{product.characteristics.map(c => (
					<div className={styles.characteristics} key={c.name}>
						<span className={styles['characteristics-name']}>{c.name}</span>
						<span className={styles['characteristics-dots']}></span>
						<span className={styles['characteristics-value']}>{c.value}</span>
					</div>
				))}
			</div>
			<div className={styles['adv-block']}>

				{
				product.advantages && 
					<div className={styles.advantages}>
						<p className={styles['adv-title']}>Преимущества</p>
						{product.advantages}
					</div>				
				}


				{
				product.disadvantages && 				
				<div className={styles.disadvantages}>
					<p  className={styles['adv-title']}>Недостатки</p>
					{product.disadvantages}
				</div>
				}

			</div>
			<Divider className={cn(styles.hr, styles.hr2)}></Divider>
			<div className={styles.actions}>
				<Button appearance={'primary'}>Узнать подробнее</Button>
				<Button className={styles['review-button']} appearance={'ghost'} arrow={'right'}>Читать отзывы</Button>
			</div>

		</Card>

	)
}

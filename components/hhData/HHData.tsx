import { HHDataProps } from './HHData.props'
import cn from 'classnames';
import styles from './HHData.module.css';
import { Card } from '../Card/Card';
import StarIcon from './Star.svg'
import { priceRu } from '../../helpers/helpers';

export const HHData = ({count, juniorSalary, middleSalary, seniorSalary}: HHDataProps): JSX.Element => {
	return (
			<div className={styles.hh}>
				<Card className={styles.count}>
					<div className={styles.title}>Всего вакансий</div>
					<div className={styles['count-value']}>{count}</div>
				</Card>
				<Card className={styles.salary}>
					<div>
						<div className={styles.title}>Начальный</div>
						<div className={styles['salary-value']}>{priceRu(juniorSalary)}</div>
						<div className={styles.rate}>
							<StarIcon className={styles.filed} />
							<StarIcon />
							<StarIcon />
						</div>
					</div>
					<div>
						<div className={styles.title}>Средний</div>
						<div className={styles['salary-value']}>{priceRu(middleSalary)}</div>
						<div className={styles.rate}>
							<StarIcon className={styles.filed} />
							<StarIcon className={styles.filed}/>
							<StarIcon />
						</div>
					</div>
					<div>
						<div className={styles.title}>Профессионал</div>
						<div className={styles['salary-value']}>{priceRu(seniorSalary)}</div>
						<div className={styles.rate}>
							<StarIcon className={styles.filed} />
							<StarIcon className={styles.filed}/>
							<StarIcon className={styles.filed}/>
						</div>
					</div>
				</Card>
			</div>
	)
}

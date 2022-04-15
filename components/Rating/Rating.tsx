import { RatingProps } from './Rating.props'
import cn from 'classnames';
import styles from './Rating.module.css';
import StarIcon from './Star.svg'
import { useEffect, useState, KeyboardEvent } from 'react';

export const Rating = ({rating, changeRating, isChangable = false, ...props}: RatingProps): JSX.Element => {
	const [ratingArray, changeRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	// constructRating will be using in another functions
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((_: JSX.Element, i: number): JSX.Element => {
			return (
					<StarIcon
						key={i}
						className={cn(styles.star, [{
							[styles.filled]: currentRating > i,
							[styles.editable]: isChangable,
						}])}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i+1)}
						tabIndex={isChangable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGAElement>) => isChangable && handleSpace(e, i + 1)}
					/>
			)
		});

		const changeDisplay = (rating: number) => {
			if(!isChangable) {
				return;
			}
			constructRating(rating);
		}

		const onClick = (rating: number) => {
			if(!isChangable || !changeRating) {
				return;
			}
			changeRating(rating);
		}

		const handleSpace = (e: KeyboardEvent<SVGAElement>, rating: number) => {
			if(e.code !== "Space" || !changeRating) {
				return;
			}
			changeRating(rating);
		}

		return changeRatingArray(updatedArray);
	}

	return (
		<div {...props}>
			{ ratingArray.map((el, i) => (<span key={i}>{el}</span>)) }
		</div>
	)
}

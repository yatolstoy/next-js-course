import { RatingProps } from './Rating.props'
import cn from 'classnames';
import styles from './Rating.module.css';
import StarIcon from './Star.svg'
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';

export const Rating = forwardRef(({rating, changeRating, isChangable = false, error, tabIndex, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, changeRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

	useEffect(() => {
		constructRating(rating);
	// constructRating will be using in another functions
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating, tabIndex]);

	const computeFocus = (r: number, i: number):number => {
		if(!isChangable) return -1;
		
		if(!rating && i === 0) {
			return tabIndex ?? 0;
		}

		if(r === i + 1) {
			return tabIndex ?? 0;
		}

		return -1;
	}

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((_: JSX.Element, i: number): JSX.Element => {
			
			return (
				<span 
					key={i}
					className={cn(styles.star, [{
							[styles.filled]: currentRating > i,
							[styles.editable]: isChangable
					}])}	
					ref={r => ratingArrayRef.current?.push(r)}
					onKeyDown={handleKey}
					tabIndex={computeFocus(rating,i)}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i+1)}
					role={isChangable ? 'slider' : ''}
					aria-valuenow={rating}
					aria-valuemax={5}
					aria-valuemin={0}
					aria-label={isChangable ? 'Укажите рейтинг' : ('рейтинг ' + rating)}
					aria-invalid={!!error}
				>
					<StarIcon/>
				</span>

			)
		});
		
		return changeRatingArray(updatedArray);
	}

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

	const handleKey = (e: KeyboardEvent) => {
		if(!isChangable || !changeRating) {
			return;
		}
			
		if(e.code == "ArrowRight" || e.code == "ArrowUp") {
			if(!rating) {
				changeRating(1);
			} else {
				e.preventDefault()
				changeRating(rating < 5 ? rating + 1 : 5);
				ratingArrayRef.current[rating]?.focus();
			}
		}

		if(e.code == "ArrowLeft" || e.code == "ArrowDown") {
			if(!rating) {
				changeRating(0);
			} else {
				e.preventDefault()
				changeRating(rating > 1 ? rating - 1 : 0);
				ratingArrayRef.current[rating-2]?.focus();
			}
		}
	}

	return (
		<div className={cn(styles.wrapper, {
			[styles.error]: error
		})} {...props} ref={ref}>
			{ ratingArray.map((el, i) => (<span key={i}>{el}</span>)) }
			{error && <span role="alert" className={styles['error-text']}>{ error.message }</span>}
		</div>
	);
});

Rating.displayName = 'RatingComponent';

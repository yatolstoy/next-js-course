import { ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './Close.svg'
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
	const {register, control, handleSubmit, formState: { errors }, reset, clearErrors} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post(API.review.createDemo, {...formData, productId})
			if(data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e) {
			setError(e.message);
		}
	}

	const tabIndex = () => isOpened ? 0 : -1;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles['review-form'], className)} {...props}>
				<Input 
					placeholder={'Имя'} 
					error={errors.name}
					{...register("name", {
						required: {
							value: true, 
							message: 'Заполните имя'
						}
					})} 
					tabIndex={tabIndex()}
					aria-invalid={!!errors.name}
				/>
				<Input 
					placeholder={'Заголовок отзыва'}
					error={errors.title}
					{...register("title", {
						required: {
							value: true, 
							message: 'Заполните заголовок'
						}
					})}
					className={styles.title}
					tabIndex={tabIndex()}
					aria-invalid={!!errors.title}
				/>

				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{
						required: {
							value: true, 
							message: 'Заполните рейтинг'
						}
					}}
						render={({field}) => (
							<Rating 
								isChangable 
								changeRating={field.onChange} 
								ref={field.ref} 
								rating={field.value} 
								error={errors.rating}
								tabIndex={tabIndex()}
							/>
						)}
						/>
				</div>
				<Textarea 
					placeholder='Текст отзыва' 
					className={styles.description} 
					error={errors.description}
					{...register('description', {
						required: {
							value: true, 
							message: 'Заполните текст отзыва'
						}
					})}
					tabIndex={tabIndex()}
					aria-label="Текст отзыва"
					aria-invalid={!!errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance={'primary'} tabIndex={tabIndex()} onClick={() => {clearErrors()}}>Отправить</Button>
					<span className={styles.info}>*Перед публикацией отзыв пройдёт предварительную проверку</span>
				</div>
			</div>
			{isSuccess && 
			<div className={cn(styles.panel, styles.success)} role="alert">
				<div className={styles['success-title']}>Ваш отзыв отправлен</div>
				<div>
					Спасибо, Ваш отзыв будет опубликован после проверки.
				</div>
				<button 
					className={styles.close} 
					onClick={() => setError(undefined)} 
					aria-label="Закрыть оповещение"
					tabIndex={tabIndex()}
				>
					<CloseIcon />
				</button>
			</div>
			}
			{error && 
			<div className={cn(styles.panel, styles.error)} role="alert">
				Что-то пошло не так! Попробуйте обновить страницу
				<button 
					className={styles.close} 
					onClick={() => setError(undefined)} 
					aria-label="Закрыть оповещение"
					tabIndex={tabIndex()}
				>
					<CloseIcon />
				</button>
			</div>
			}
		</form>
	)
}

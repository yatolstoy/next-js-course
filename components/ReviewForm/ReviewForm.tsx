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

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
	const {register, control, handleSubmit, formState: { errors }} = useForm<IReviewForm>();
	
	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	}

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
					})} />
				<Input 
					placeholder={'Заголовок отзыва'}
					error={errors.title}
					{...register("title", {
						required: {
							value: true, 
							message: 'Заполните заголовок'
						}
					})}
					className={styles.title}  />

				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({field}) => (
							<Rating isChangable changeRating={field.onChange} ref={field.ref} rating={field.value}></Rating>
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
					})}/>
				<div className={styles.submit}>
					<Button appearance={'primary'}>Отправить</Button>
					<span className={styles.info}>*Перед публикацией отзыв пройдёт предварительную проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles['success-title']}>Ваш отзыв отправлен</div>
				<div>
					Спасибо, Ваш отзыв будет опубликован после проверки.
				</div>
				<CloseIcon className={styles.close} />
			</div>
		</form>
	)
}

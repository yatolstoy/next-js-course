import { TextareaProps } from './Textarea.props'
import cn from 'classnames';
import styles from './Textarea.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<textarea className={cn(styles.textarea, {
				[styles.error]: error
			})} ref={ref} {...props} />
			{error && <span className={styles['error-text']}>{error.message}</span>}
		</div>
	)
});

Textarea.displayName = 'Textarea Component'

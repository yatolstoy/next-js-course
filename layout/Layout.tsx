import { LayoutProps } from './Layout.props'
import cn from 'classnames';
import styles from './Layout.module.css';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';

const Layout = ({children, ...props}: LayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if(['Space', 'Enter'].includes(key.code)) {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	}

	return (
		<div className={styles.wrapper} {...props}>
			<a tabIndex={1} 
			onFocus={() => setIsSkipLinkDisplayed(true)}
			className={cn(styles.skiplink, {
				[styles.displayed]: isSkipLinkDisplayed
			})}
			onKeyDown={skipContentAction}
			>Сразу к содержанию</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.main} ref={bodyRef} tabIndex={0}>
				{ children }
			</main>
			<Footer className={styles.footer} />
		</div>
	)
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={ props.menu } firstCategory={ props.firstCategory }>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		)
	}
}
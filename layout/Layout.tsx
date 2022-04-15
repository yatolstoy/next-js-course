import { LayoutProps } from './Layout.props'
import cn from 'classnames';
import styles from './Layout.module.css';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { FunctionComponent } from 'react';

const Layout = ({children, ...props}: LayoutProps): JSX.Element => {
	return (
		<div {...props}>
			<Header />
			<div>
				<Sidebar />
				<main>
					{ children }
				</main>
			</div>
			<Footer />
		</div>
	)
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}
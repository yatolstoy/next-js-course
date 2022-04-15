import { LayoutProps } from './Layout.props'
import cn from 'classnames';
import styles from './Layout.module.css';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';

export const Layout = ({children, ...props}: LayoutProps): JSX.Element => {
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

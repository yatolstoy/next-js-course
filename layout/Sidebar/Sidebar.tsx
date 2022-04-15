import { SidebarProps } from './Sidebar.props'
import cn from 'classnames';
import styles from './Header.module.css';

export const Sidebar = ({...props}: SidebarProps): JSX.Element => {
	return (
		<div {...props}>
			SIDEBAR
		</div>
	)
}

import styles from './Dropdown.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

type DropdownItem = {
	href?: string;
	icon?: React.ReactNode;
	label: string;
	onClick?: () => void;
}

type DropdownProps = {
	open?: boolean;
	items: Array<DropdownItem>;
}

const Dropdown = ({ open = false, items = [] }: DropdownProps) => {
  return (
	<div className={classNames(styles.Dropdown, { [styles.Open]: open })}>
		<ul>
		  {
			items.map((item, index) => {
			  return (
				<li key={index}>
				  {
					item.href ?
					  <Link href={item.href}>
							<a><span>{item.icon}</span> {item.label}</a>
					  </Link> :
					  <button onClick={item.onClick}>
							<a>{item.label}</a>
					  </button>
				  }
				</li>
			  );
			})
		  }
		</ul>
	</div>
  );
}

export default Dropdown;
import styles from './Navbar.module.scss';
import Logo from '@/components/atoms/Logo/Logo';
import Container from '@/components/atoms/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import {
	BellIcon, BriefcaseIcon,
	CogIcon,
	LoginIcon,
	LogoutIcon,
	PlusCircleIcon,
	SearchIcon,
	UserIcon
} from '@heroicons/react/outline';
import Dropdown from '@/components/molecules/Dropdown/Dropdown';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { UserRole } from '@/enums/roles';
import { resolveImage } from '@/utils/images';

type NavBarProps = {
	user?: any;
}

const NavBar = ({ user }: NavBarProps) => {
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [search, setSearch] = useState('');

	const items = [];

	if (user) {
		items.push({
			icon: <UserIcon/>,
			label: `${ user.displayName }`,
			href: `/users/${ user.id }`
		});

		items.push({
			icon: <CogIcon/>,
			label: 'Paramètres',
			href: '/profile'
		});

		if (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR) {
			items.push({
				icon: <BriefcaseIcon/>,
				label: 'Administration',
				href: '/admin'
			});
		}

		items.push({
			icon: <LogoutIcon/>,
			label: 'Deconnexion',
			href: '/auth/logout'
		});
	} else {
		items.push({
			icon: <LoginIcon/>,
			label: 'Se connecter',
			href: '/auth/signin'
		});

		items.push({
			icon: <PlusCircleIcon/>,
			label: 'S\'inscrire',
			href: '/auth/signup'
		});
	}

	const avatar = user ? user.avatar : 'default.png';

	const handleAvatarClick = () => {
		setDropdownOpen(!dropdownOpen);
	}

	const handleSearchClick = async () => {
		await router.push(`/search/${ search }`);
	}

	const handleEnterPress = async (e: any) => {
		if (e.key === 'Enter') {
			await handleSearchClick();
		}
	}

	return (
		<nav className={ styles.NavBar }>
			<Container>
				<div className={ styles.Content }>
					<div className={ styles.Left }>
						<Logo width={ 42 } height={ 42 }/>
					</div>

					<div className={ styles.Left }>
						<input type="text" className={ styles.SearchInput }
							   placeholder="Rechercher des relations, ressources et plus..." value={ search }
							   onChange={ (e) => setSearch(e.target.value) } onKeyPress={ handleEnterPress }/>
						<button className={ styles.SearchButton } onClick={ handleSearchClick }><SearchIcon/></button>
					</div>

					<div className={ styles.Right }>
						{ user && 
							<Link href="/notifications">
								<a className={ styles.BellLink }>
									{ user && user.requestsCount > 0 && <div className={ styles.NewNotificationBadge }/> }
									<BellIcon className={ styles.BellIcon }/>
								</a>
							</Link> 
						}

						<div className={ styles.AvatarContainer }>
							<Image src={ resolveImage(`avatars/${ avatar }`) } alt="Avatar" layout="fill" className={ styles.Avatar }
								   onClick={ handleAvatarClick }/>
							<Dropdown items={ items } open={ dropdownOpen }/>
						</div>
					</div>
				</div>
			</Container>
		</nav>
	);
}

export default NavBar;
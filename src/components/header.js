import {BurgerIcon, Logo, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';

export default function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={`${styles.nav} ml-5`}>
                <a href="#" className={`${styles.linkActive} text text_type_main-default mr-7 pt-4 pb-4`}>
                    <BurgerIcon type="primary" />
                    <span className="ml-2">Конструктор</span>
                </a>
                <a href="#" className={`${styles.linkInactive} text text_type_main-default text_color_inactive pt-4 pb-4`}>
                    <ListIcon type="secondary" />
                    <span className="ml-2">Лента заказов</span>
                </a>
            </nav>

            <div className="mt-2 mb-2">
                <Logo />
            </div>

            <nav className={`${styles.nav} mr-5`}>
                <a href="#" className={`${styles.linkInactive} text text_type_main-default text_color_inactive pt-4 pb-4`}>
                    <ProfileIcon type="secondary" />
                    <span className="ml-2">Личный кабинет</span>
                </a>
            </nav>
        </header>
    )
}

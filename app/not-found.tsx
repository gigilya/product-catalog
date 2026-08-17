import Link from 'next/link';

import scss from './not-found.module.scss';

export default function NotFound() {
    return (
        <div className={scss.wrap}>
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link href="/">Вернуться на главную</Link>
        </div>
    );
}

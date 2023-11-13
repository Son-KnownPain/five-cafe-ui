import classNames from "classnames/bind";
import Header from "../components/Header";
import styles from './DefaultLayout.module.scss';
import Sidebar from "../components/Sidebar";
import config from "~/config";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div id={cx('default-layout')}>
            <Header />
            <div className={cx('under-header')} style={{ marginTop: config.layout.headerHeight }}>
                <Sidebar />
                <div className={cx('content')} style={{ marginLeft: config.layout.sidebarWidth }}>
                    {children}
                </div>
            </div>
        </div >
    );
}

export default DefaultLayout;
import { onClickSmoothLink } from "@/components/ScriptContainer";
import { useCallback, useRef, useState } from "react";
import style from "./Header.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import ru from "@/public/locales/ru/common.json";
import en from "@/public/locales/en/common.json";
const dictionary = { ru, en };

export default function MainHeader() {
    const t = dictionary[useRouter().locale];

    const mobileMenuRef = useRef();
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    return (<>
        <div className={style.header_container}>
            <div className={style.logo_container}>
                <Link href="/">
                    <a className={style.logo} />
                </Link>
            </div>
            <div className={style.nav_container}>
                <Menu t={t} />
                <LanguageBlock />
            </div>
            <div className={style.mobile_menu_icn_container}>
                <div
                    className={cn(style.mobile_menu_icn_wrapper, { [style.active]: mobileMenuOpened })}
                    onClick={() => setMobileMenuOpened(prev => !prev)}
                >
                    <div className={style.mobile_icn} />
                    <div className={style.mobile_icn} />
                    <div className={style.mobile_icn} />
                </div>
            </div>
        </div>
        <div
            ref={mobileMenuRef}
            className={cn(style.mobile_menu, { [style.opened]: mobileMenuOpened })}
            style={{ height: mobileMenuOpened ? mobileMenuRef.current.scrollHeight : 0 }}
        >
            <Menu t={t} onClickLink={() => setMobileMenuOpened(false)}>
                <div className={style.social_links_container}>
                    <SocialLinksList />
                </div>
                <LanguageBlock />
            </Menu>
        </div>
    </>);
}

function Menu({ t, onClickLink, children }) {
    const MenuItem = useCallback(({ name }) => (
        <li className={style.menu_item} onClick={onClickLink}>
            <a href={`#${name}`} className={style.menu_link} onClick={onClickSmoothLink}>{ t[name] }</a>
        </li>
    ), []);

    return (
        <ul className={style.menu_list}>
            <MenuItem name="about" />
            <MenuItem name="techno" />
            <MenuItem name="animals" />
            <MenuItem name="roadmap" />
            <MenuItem name="team" />
            <MenuItem name="press" />
            <li className={cn(style.menu_item, style.drop)}>
                <a className={style.menu_link_drop}>{ t["whitepaper"] }</a>
                <br />
                <div className={style.dropmenu_container}>
                    <ul className={style.menu_list}>
                        <li className={style.menu_item}>
                            <a target="_blank" href="/Nuzai_Network_Whitepaper_RU.pdf" className={style.menu_link}>RU</a>
                        </li>
                        <li className={style.menu_item}>
                            <a target="_blank" href="/Nuzai_Network_Whitepaper_EN.pdf" className={style.menu_link}>EN</a>
                        </li>
                    </ul>
                </div>
            </li>
            { children }
        </ul>
    );
}

function SocialLinksList() {
    const SocialLink = useCallback(({ href, name }) => (
        <li className={style.social_links_elem}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={cn(style.social_link, style[name])} />
        </li>
    ), []);
    
    return (
        <ul className={style.social_links_list}>
            <SocialLink href="https://t.me/nuzai_official" name="telegram" />
            <SocialLink href="https://twitter.com/nuz_ai" name="twitter" />
            {/* <SocialLink href="" name="github" /> */}
            <SocialLink href="https://www.instagram.com/nuzai_official" name="instagram" />
        </ul>
    );
}

function LanguageBlock() {
    const _Link = useCallback(({ toLocale, title }) => {
        const { locale, pathname, query } = useRouter();
        
        return (
            <Link href={{ pathname, query }} locale={toLocale} scroll={false}>
                <a className={cn(style.lang_button, { [style.active]: toLocale === locale })}>{ title }</a>
            </Link>
        );
    }, []);

    return (
        <div className={style.lang_container}>
            <div className={style.lang_wrapper} >
                <_Link toLocale="en" title="en" />
                <span className={style.delimiter}>|</span>
                <_Link toLocale="ru" title="ru" />
            </div>
        </div>
    );
}
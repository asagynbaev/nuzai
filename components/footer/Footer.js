import { onClickSmoothLink } from "../ScriptContainer";
import style from "./Footer.module.scss";
import { useRouter } from "next/router";
import cn from "classnames";

import ru from "@/public/locales/ru/common.json";
import en from "@/public/locales/en/common.json";
const dictionary = { ru, en };

export default function Footer() {
    const t = dictionary[useRouter().locale];

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.column}>
                    <div className={style.logo_wrapper}>
                        <a className={style.logo}/>
                    </div>
                    <ul className={style.menu_list}>
                        <MenuItem t={t} name="about" />
                        <MenuItem t={t} name="techno" />
                        <MenuItem t={t} name="nft" />
                        <MenuItem t={t} name="animals" />
                        <MenuItem t={t} name="roadmap" />
                        <MenuItem t={t} name="team" />
                        <MenuItem t={t} name="press" />
                        <MenuItem t={t} name="distribution" />
                    </ul>
                </div>
                <div className={style.column}>
                    <ul className={style.social_menu}>
                        <SocialLink text="nuzai.official@gmail.com" href="mailto:nuzai.official@gmail.com" name="mail" />
                        <SocialLink href="https://t.me/nuzai_official" name="telegram" />
                        <SocialLink href="https://twitter.com/nuz_ai" name="twitter" />
                        <SocialLink href="https://www.instagram.com/nuzai_official" name="instagram" />
                    </ul>
                </div>
                <div className={style.row}>
                    <p className={style.copyright}>
                        &#169;Nuzai Network. All rights reserved. 
                        Designed with <a href="https://reginleif.tech/">Reginleif</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

function MenuItem({ t, name }) {
    return (
        <li className={style.menu_item}>
            <a href={`#${name}`} className={style.menu_link} onClick={onClickSmoothLink}>{ t[name] }</a>
        </li>
    );
}

function SocialLink({ href, name, text }) {
    return (
        <li className={style.social_links_elem}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={cn(style.social_link, style[name])}>{ text }</a>
        </li>
    );
}

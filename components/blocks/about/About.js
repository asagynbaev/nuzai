import { useTranslation } from "next-i18next";
import style from "./About.module.scss";
import cn from "classnames";

export default function About() {
    const { t } = useTranslation("block_index_about");

    return (
        <div id="about" className={style.content_block}>
            <div className={style.content_container}>
                <div className={style.title_wrapper}>
                    <div className={style.grid_wrapper}>
                        <p className={cn(style.about_text)}>01.</p>
                        <h3>{ t("title") }</h3>
                    </div>
                    <h2>{ t("subtitle") }</h2>
                </div>
            </div>
            <div className={style.content_container}>
                <p>{ t("text-1") }</p>
                <p>{ t("text-2") }</p>
                <p>{ t("text-3") }</p>
            </div>
        </div>
    );
}
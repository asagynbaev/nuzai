import { onClickSmoothLink } from "@/components/ScriptContainer";
import { useTranslation } from "next-i18next";
import style from "./Top.module.scss";

export default function Top() {
    const { t } = useTranslation("block_index_top");

    return (
        <div className={style.content_block}>
            <div className={style.title_wrapper}>
                <h2>{ t("title") }</h2>
                <h1>{ t("nuzai") }</h1>
                <p>{ t("earn") }</p>
                <a href="#techno" className={style.readMore} onClick={onClickSmoothLink}>
                    <span className={style.readMore_icon} />
                </a>
            </div>
            <div className={style.blure} />
        </div>
    );
}
import { useTranslation } from "next-i18next";
import style from "./Technology.module.scss";

export default function Technology() {
    const { t } = useTranslation("block_index_technology");

    return (
        <div id="techno" className={style.content_block}>
            <div className={style.top_title}>
                <div className={style.delimiter} />
                <h2>{ t("title") }</h2>
                <h3>{ t("subtitle") }</h3>
            </div>
            <div className={style.content}>
                <p>{ t("text-1") }</p>
                <p>{ t("text-2") }</p>
                <p>{ t("text-3") }</p>
            </div>
        </div>
    );
}
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import style from "./Team.module.scss";
import cn from "classnames";

export default function Team() {
    const { t } = useTranslation("block_index_team");

    const grabRef = useRef();
    const timelineRef = useRef();
    const scrollbarRef = useRef();
    const thumbRef = useRef();

    const [isGrabbing, setIsGrabbing] = useState(false);

    const syncThumbWithContainer = useCallback(() => {
        const progress = timelineRef.current.scrollLeft / (timelineRef.current.scrollWidth - grabRef.current.offsetWidth);
        const left = progress * (scrollbarRef.current.offsetWidth - thumbRef.current.offsetWidth);
        thumbRef.current.style.left = `${left}px`;
    }, []);

    const onDrag = useCallback(direction => {
        setIsGrabbing(true);
        let pageX = 0;
    
        const onMouseMove = evt => {
            if(pageX !== 0) {
                timelineRef.current.scrollLeft += direction * (pageX - evt.pageX);
                syncThumbWithContainer();
            }
            pageX = evt.pageX;
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            setIsGrabbing(false);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }, []);

    return (
        <div id="team" className={style.content_block}>
            <div className={style.title_wrapper}>
                <div className={style.grid_wrapper}>
                    <p>04.</p>
                    <h3>{ t("title") }</h3>
                </div>
                <h2>{ t("subtitle") }</h2>
            </div>
            <div
                ref={grabRef}
                className={cn(style.content, { [style.grabbing]: isGrabbing })}
                onDragStart={evt => evt.preventDefault()}
            >
                <div
                    ref={timelineRef}
                    onMouseDown={() => onDrag(1)}
                    className={style.team_container}
                    onScroll={syncThumbWithContainer}
                >
                    <div className={style.cards_wrapper}>
                        <TeamCard
                            name={t("sagynbaev_azimbek")}
                            position={t("ceo")}
                            twitter="Azim69646514"
                            linkedin="azimbek-sagynbaev-2bab1b167"
                            image="/images/team/azim"
                        />
                        <TeamCard
                            name={t("litvinov_mikhail")}
                            position={t("communication_manager")}
                            twitter="Mikes_DS"
                            linkedin="litvinov-mikhail"
                            image="/images/team/mikhail"
                        />
                        <TeamCard
                            name={t("gavrilova_maria")}
                            position={t("ux_ui_designer")}
                            linkedin="maria-gavrilova-b2779a215"
                            image="/images/team/maria"
                        />
                        <TeamCard
                            name={t("abramova_alesya")}
                            position={t("copywriter")}
                            linkedin="alesya-abramova-83b051149"
                            image="/images/team/alesya"
                        />
                        <TeamCard
                            name={t("semyon_butenko")}
                            position={t("protocol_engineer")}
                            linkedin="semyon-b-832303163"
                            image="/images/team/semyon"
                        />
                        <TeamCard
                            name={t("bunmeng_bo")}
                            position={t("product_engineer")}
                            linkedin="bobunmeng"
                            image="/images/team/bunmeng"
                        />
                    </div>
                </div>
                <br />
                <div ref={scrollbarRef} className={style.scrollbar_wrapper}>
                    <div className={style.scrollbar} />
                    <div ref={thumbRef} className={style.scrollbar_thumb} onMouseDown={() => onDrag(-1)} />
                </div>
            </div>
        </div>
    );
}

function TeamCard({ name, position, twitter, linkedin, image }) {
    return (
        <div className={style.team_card}>
            <div className={style.team_photo_container}>
                <img src={image} alt="" />
            </div>
            <div className={style.team_info}>
                <p className={style.prof}>{ position }</p>
                <p className={style.name}>{ name }</p>
                <ul className={style.team_social_wrapper}>
                    {
                        twitter && (
                            <li className={style.team_social_elem}>
                                <a href={`https://twitter.com/${twitter}`} className={cn(style.team_link, style.twitter)} />
                            </li>
                        )
                    }
                    {
                        linkedin && (
                            <li className={style.team_social_elem}>
                                <a href={`https://www.linkedin.com/in/${linkedin}`} className={cn(style.team_link, style.linkedin)} />
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
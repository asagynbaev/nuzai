import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import style from "./Roadmap.module.scss";
import cn from "classnames";
import bound from "@/utils/math/bound";

const points = [
    { name: "alpha", active: true },
    { name: "ido" },
    { name: "listing" },
    { name: "closed_beta" },
    { name: "open_beta" },
    { name: "release" },
    { name: "nnb_testnet" },
    { name: "nnb_mainnet" }
]

export default function Roadmap() {
    const { t } = useTranslation("block_index_roadmap");

    const timelineRef = useRef();
    const scroll = (scrollLeft = 0, duration = 800) => $(timelineRef.current).stop().animate({ scrollLeft }, duration);

    const [offsets, setOffsets] = useState([]);
    const addOffset = offset => setOffsets(prev => prev.length < points.length ? [...prev, offset] : prev);
    
    const [isGrabbing, setIsGrabbing] = useState(false);
    
    const [activeElement, setActiveElement] = useState(0);
    const moveActiveElement = direction => {
        const _activeElement = bound(activeElement + direction, 0, points.length - 1);
        setActiveElement(_activeElement);
        scroll(offsets[_activeElement]);
    }

    useEffect(() => {
        if(!offsets.length) return;

        const activeElement = points.reduce((result, point, index) => { if(point.active) result = index; return result; }, 0);
        setActiveElement(activeElement);
        scroll(offsets[activeElement], 0);
    }, [offsets]);

    const syncStateWithScroll = () => {
        let minDifference = Number.MAX_SAFE_INTEGER, index;
        for(let i = 0; i < offsets.length; i++) {
            const difference = Math.abs(timelineRef.current.scrollLeft - offsets[i]);
            if(difference < minDifference) {
                minDifference = difference;
                index = i;
            }
        }

        setActiveElement(index);
        // scroll(offsets[index], 400);
    }

    const onDrag = useCallback(() => {
        setIsGrabbing(true);
        let pageX = 0;
    
        const onMouseMove = evt => {
            if(pageX !== 0) timelineRef.current.scrollLeft += pageX - evt.pageX;
            pageX = evt.pageX;
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            setIsGrabbing(false);

            syncStateWithScroll();
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }, [offsets, activeElement]);

    return (
        <div id="roadmap" className={style.content_block}>
            <div className={style.content}>
                <div className={style.column}>
                    <div className={style.title_wrapper}>
                        <div className={style.grid_wrapper}>
                            <p>03.</p>
                            <h3>{ t("title") }</h3>
                        </div>
                        <h2>{ t("subtitle") }</h2>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.control_container}>
                        <div className={cn(style.roadmap_control, style.left)} onClick={() => moveActiveElement(-1)} />
                        <div className={cn(style.roadmap_control, style.right)} onClick={() => moveActiveElement(1)} />
                    </div>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.roadmap}>
                    <div className={style.obscurity} />
                    <div className={style.obscurity} />
                    <div
                        ref={timelineRef}
                        onMouseDown={onDrag}
                        onScroll={syncStateWithScroll}
                        onTouchEnd={syncStateWithScroll}
                        onDragStart={evt => evt.preventDefault()}
                        className={cn(style.roadmap_container, { [style.grabbing]: isGrabbing })}
                    >
                        <div className={style.roadmap_wrapper}>
                            <RoadmapElement ghost />
                            {
                                points.map(({ done, name }) => (
                                    <RoadmapElement
                                        key={name}
                                        done={done}
                                        addOffset={addOffset}
                                        time={t(`${name}_time`)}
                                        text={t(`${name}_text`)}
                                        title={t(`${name}_title`)}
                                    />
                                ))
                            }
                            <RoadmapElement ghost />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const WINDOW_WIDTH_PER_ELEMENT_WIDTH = 0.26664; // Idk why is this number

function RoadmapElement({ ghost = false, time, title, text, addOffset }) {
    const ref = useRef();
    useEffect(() => {
        if(!addOffset) return;

        const correction = window.innerWidth > 1024 ? window.innerWidth * WINDOW_WIDTH_PER_ELEMENT_WIDTH : 0;
        addOffset(ref.current.offsetLeft - correction);
    });

    return (
        <div ref={ref} className={cn(style.roadmap_elem, { [style.ghost]: ghost })}>
            <div className={style.roadmap_time}>
                <p>{ time }</p>
            </div>
            <div className={style.roadmap_content}>
                <div className={style.roadmap_content_wrapper}>
                    <h2 className={style.roadmap_elem_title}>{ title }</h2>
                    <p className={style.roadmap_elem_text}>{ text }</p>
                </div>
            </div>
        </div>
    );
}
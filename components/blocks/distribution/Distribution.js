import style from "./Distribution.module.scss";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import cn from "classnames";

export default function Distribution() {
    const { t } = useTranslation("block_index_distribution");
    const [hoveredFractionID, setHoveredFractionID] = useState("");
    const [fractions, setFractions] = useState([]);

    useEffect(() => {
        function getGradient({ x: [x0 = 0, x1 = 0] = [], y: [y0 = 0, y1 = 0] = [], colors: [[color1 = "white", stop1 = 0], [color2 = "black", stop2 = 1]] }) {
            const gradient = document.createElement("canvas").getContext("2d").createLinearGradient(x0, y0, x1, y1);
            gradient.addColorStop(stop1, color1);
            gradient.addColorStop(stop2, color2);
            return gradient;
        }

        function getGradientsForColor({ x, y, color1, color2 }) {
            return {
                color: getGradient({
                    x, y, colors: [
                        [`rgba(${color1.join(", ")}, 0.6)`, 0.2],
                        [`rgba(${color2.join(", ")}, 0.6)`]
                    ]
                }),
                hoverColor: getGradient({
                    x, y, colors: [
                        [`rgb(${color1.join(", ")})`, 0.2],
                        [`rgb(${color2.join(", ")})`]
                    ]
                })
            }
        }

        const colors = ({
            red: {
                colorName: "red",
                ...getGradientsForColor({ x: [150, 300], color1: [252, 68, 120], color2: [255, 196, 155] })
            },
            green: {
                colorName: "green",
                ...getGradientsForColor({ x: [300, 200], y: [50, 200], color1: [0, 243, 97], color2: [160, 255, 236] })
            },
            blue: {
                colorName: "blue",
                ...getGradientsForColor({ x: [250, 150], y: [50, 200], color1: [18, 67, 253], color2: [14, 188, 255] })
            },
            pink: {
                colorName: "pink",
                color: "rgba(255, 5, 95, 0.6)",
                hoverColor: "rgb(255, 5, 95)"
            },
            violet: {
                colorName: "violet",
                ...getGradientsForColor({ x: [200, 50], y: [300, 150], color1: [85, 60, 255], color2: [182, 129, 255] })
            },
            orange: {
                colorName: "orange",
                ...getGradientsForColor({ x: [200, 50], y: [100, 300], color1: [243, 75, 7], color2: [212, 199, 21] })
            }
        });
        
        setFractions([
            {
                id: "early_backers",
                title: "Early Backers",
                percent: 5,
                ...colors.green
            },
            {
                id: "community_airdrop",
                title: "Community Airdrop",
                percent: 1,
                ...colors.pink,
            },
            {
                id: "public_sale",
                title: "Public Sale",
                percent: 35,
                ...colors.blue
            },
            {
                id: "development_team",
                title: "Development Team",
                percent: 10,
                ...colors.red
            },
            {
                id: "strategic_partners",
                title: "Strategic Partners",
                percent: 19,
                ...colors.violet
            },
            {
                id: "liquidity_and_ecosystem",
                title: "Liquidity and Ecosystem",
                percent: 30,
                ...colors.orange
            },
        ]);
    }, []);

    return (
        <div id="distribution" className={style.content_block}>
            <div className={style.content_container}>
                <div className={style.title_wrapper}>
                    <div className={style.grid_wrapper}>
                        <p>06.</p>
                        <h3>{ t("title") }</h3>
                    </div>
                    <h2>
                        { t("subtitle-1") }
                        <br />
                        { t("subtitle-2") }
                    </h2>
                </div>
                <div className={style.content}>
                    <p className={style.main_text}>{ t("text") }</p>
                    <div className={style.legend_wrapper}>
                        <ul className={style.legend}>
                            {
                                fractions.length && fractions.map(({ id, colorName, percent }) => (
                                    <LegendItem
                                        key={id}
                                        name={id}
                                        text={t(id)}
                                        color={colorName}
                                        percent={`${percent}%`}
                                        onHover={setHoveredFractionID}
                                        active={hoveredFractionID === id}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.content_container}>
                {
                    fractions.length && (
                        <Doughnut
                            data={{
                                labels: fractions.map(({ id }) => t(id)),
                                datasets: [{
                                    data: fractions.map(({ percent }) => percent),
                                    backgroundColor: fractions.map(({ id, color, hoverColor }) => hoveredFractionID === id ? hoverColor : color),
                                    hoverBackgroundColor: fractions.map(({ hoverColor }) => hoverColor),
                                    borderWidth: 3,
                                    borderColor: '#000000'
                                }]
                            }}
                            options={{
                                onHover: evt => {
                                    const activeElements = evt.chart.getActiveElements();
                                    if(!activeElements.length) return setHoveredFractionID("");

                                    setHoveredFractionID(fractions[activeElements[0].index].id);
                                },
                                cutout: "70%",
                                animation: { animateRotate: false },
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { enabled: false }
                                }
                            }}
                            width={320}
                            height={320}
                        />
                    )
                }
            </div>
        </div>
    );
}

function LegendItem({ name, active, percent, color, text, onHover }) {
    return (
        <li className={cn(style.legend_item, { [style.active]: active })} onMouseEnter={() => onHover(name)} onMouseLeave={() => onHover("")}>
            <div className={cn(style.legend_color, style[color])}>
                <div className={style.dot} />
            </div>
            <p className={style.legend_item_text}>
                <span className={style.elem_percent}>{ percent }</span>
                { text }
            </p>
        </li>
    );
}

// import { useEffect, useRef, useState } from "react";
// const imgStyles = {
//     // WebkitUserSelect: "none",
//     // MozUserSelect: "none",
//     // msUserSelect: "none",
//     userSelect: "none",
//     position: "relative"
// }

// function Diagram() {
//     const size = "320px";
//     const imgMult = 0.3;

//     const [poses, setPoses] = useState({
//         "pink": {
//             "width": 285,
//             "height": 126,
//             "left": 82,
//             "top": 80,
//             "angle": 126.92
//         },
//         "blue": {
//             "width": 569,
//             "height": 207,
//             "left": -55,
//             "top": -5,
//             "angle": 56.7
//         },
//         "shit": {
//             "width": 300,
//             "height": 131,
//             "left": -57,
//             "top": 44,
//             "angle": -135.72
//         },
//         "brown": {
//             "width": 417,
//             "height": 155,
//             "left": -140,
//             "top": -99,
//             "angle": -23.36
//         },
//         "green": {
//             "width": 379,
//             "height": 143,
//             "left": 3,
//             "top": 22,
//             "angle": 173.9
//         },
//         "violet": {
//             "width": 388,
//             "height": 147,
//             "left": -211,
//             "top": -73,
//             "angle": -85.61
//         }
//     });

//     useEffect(() => console.log(JSON.stringify(poses)), [poses]);

//     const grabHandler = (evt, color) => {
//         // return;
//         console.log(evt);
//         const { clientX, clientY } = evt;
//         document.onmousemove = evt => setPoses(prev => ({ ...prev, [color]: { ...prev[color], left: evt.clientX - clientX, top: evt.clientY - clientY } }));
//         document.onmouseup = () => {
//             document.onmousemove = null;
//             document.onmouseup = null;
//         }
//     }

//     function Part({ name }) {
//         return (
//         <img
//             src={`/images/diagram/flat/${name}.png`}
//             onMouseDown={evt => grabHandler(evt, name)}
//             width={imgMult * poses[name].width}
//             height={imgMult * poses[name].height}
//             style={{
//                 ...imgStyles,
//                 left: `${poses[name].left}px`,
//                 top: `${poses[name].top}px`,
//                 transform: `rotate(${poses[name].angle}deg)`
//             }} />
//         );
//     }

//     return (
//         <div style={{ width: size, height: size }}>
//             <Part name="pink" />
//             <Part name="blue" />
//             <Part name="shit" />
//             <Part name="brown" />
//             <Part name="green" />
//             <Part name="violet" />
//         </div>
//     );
// }
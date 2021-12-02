import style from "./Delimiter.module.scss";
import cn from "classnames";

export default function Delimiter() {
    return (
        <div className={cn(style.delimiter)}>
            <img src="/images/common/delimiter" alt="" />
        </div>
    );
}
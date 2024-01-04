import classNames from "classnames/bind";
import styles from "./Event.module.scss"

const cx = classNames.bind(styles);
const Event = () => {
    return (
        <div className={cx("wrapper")}>
            <h1>Sự kiện</h1>
        </div>
    )
}

export default Event;
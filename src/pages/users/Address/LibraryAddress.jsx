import classNames from "classnames/bind";
import styles from "./LibraryAddress.module.scss"

const cx = classNames.bind(styles);
const LibraryAddress = () => {
    return (
        <div className={cx("wrapper")}>
            <h1>Địa chỉ</h1>
        </div>
    )
}

export default LibraryAddress;
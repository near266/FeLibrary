import classNames from "classnames/bind";
import styles from "./ModalBorrowerSlip.module.scss"

const cx = classNames.bind(styles);
const ModalBorrowerSlip = () => {
    return (
        <div className={cx("wrapper")}>
            <h1>Thông tin giao hàng</h1>
        </div>
    )
}

export default ModalBorrowerSlip;
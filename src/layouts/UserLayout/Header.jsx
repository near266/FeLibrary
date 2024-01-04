import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { IoLibrary } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContex";
const cx = classNames.bind(styles);
function Header() {
  const { token, user } = useContext(AuthContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("box")}>
        <div className={cx("logo")}>
          <a href="/">
            <img src="src/layouts/UserLayout/dfreelogo.png" alt="logo" />
          </a>
        </div>
        <div className={cx("category")}>
          <div className={cx("category-item")}>
            <Link to="/">TRANG CHỦ</Link>
          </div>
          <div className={cx("category-item")}>
            <Link to="/books">
              <IoLibrary style={{ fontSize: '16px' }} />
              {"  "}
              TỦ SÁCH
            </Link>
            {/*<div className={cx("list-item")}>

                            <ul>
                                 {
                                listCategory.map((category) => (
                                    <li><Link to={category.id}>{category.name}</Link></li>
                                ))
                            } 

                                Đây là mẫu thôi, gọi api thì xóa đi
                                <li><Link to="/">Áo khoác</Link></li>
                                <li><Link to="/">Quần</Link></li>
                                <li><Link to="/">Áo </Link></li>
                            </ul>
                        </div>*/}
          </div>
          <div className={cx("category-item")}>
            <Link to="/handmadeItems">TIỆM HAND</Link>
          </div>
          <div className={cx("category-item")}>
            <Link to="/event">SỰ KIỆN</Link>
          </div>
          <div className={cx("category-item")}>
            <Link to="/address">ĐỊA CHỈ</Link>
          </div>
        </div>
        <div className={cx("user")}>
          <div>
            <Button>
              <PersonIcon />
            </Button>
            {token ? (
              <ul style={{ width: "150px" }}>
                <li>
                  <Link to={"/"}>Lịch sử đọc</Link>
                </li>
                <li>
                  <Link to={"/logout"}>Đăng xuất</Link>
                </li>
              </ul>
            ) : (
              <ul style={{ width: "100px" }}>
                <li>
                  <Link to={"/login"}>Đăng nhập</Link>
                </li>
                <li>
                  <Link to={"/signup"}>Đăng ký</Link>
                </li>
              </ul>
            )}
          </div>
          <div>
            <Button>
              <LibraryBooksIcon />
            </Button>
            {token ? (
              <div>
                <ul style={{ width: "150px" }}>
                  <li>
                    <Link to={"/borrowerCard"}>Thẻ đọc</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

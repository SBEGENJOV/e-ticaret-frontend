import { Link } from "react-router-dom";
import "./CategoryItem.css";
import PropTypes from "prop-types";

export default function CategoryItem({ category }) {
  return (
    <li className="category-item">
      {/* <Link to={`productCategory/${category._id}`}>
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
        </Link> */}
      <Link to={`/productCategory/${category._id}`}>
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
      </Link>
    </li>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object,
};

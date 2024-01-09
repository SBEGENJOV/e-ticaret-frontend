import "./CategoryItem.css";
import PropTypes from "prop-types";

export default function CategoryItem({ category }) {
  const apiUrl = import.meta.env.VITE_WEB_BASE_URL;
  return (
    <li className="category-item">
      {/* <Link to={`productCategory/${category._id}`}>
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
        </Link> */}
      <a href={`${apiUrl}/productCategory/${category._id}`}>
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object,
};

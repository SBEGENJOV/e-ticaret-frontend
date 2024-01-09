import BlogItem from "./BlogItem";
import "./Blog.css";
import { useEffect, useState } from "react";
import { message } from "antd";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/blog`);

        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchBlog();
  }, [apiUrl]);
  const firstThreeBlogs = blogs.slice(-3); //Sondan 3'ünü almayı sagladı

  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <br />
          <h2>Blog Sayfası</h2>
          <p>Öne Çıkan Bloglar</p>
        </div>

        <ul className="blog-list blog-carousel">
          {firstThreeBlogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blogs;

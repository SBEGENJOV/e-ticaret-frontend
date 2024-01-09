import { useParams } from "react-router-dom";
import "./BlogDetails.css";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const [singleBlog, setSingleBlog] = useState({});
  const { id: blogId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/blog/${blogId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        setSingleBlog(data);
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSingleBlog();
  }, [apiUrl, blogId]);

  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={singleBlog.img} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">            
            <h1 style={{textAlign:"center",fontSize:"5rem"}} className="blog-title">{singleBlog.title}</h1>
            <div className="blog-content">
              <h2 style={{textAlign:"center",fontSize:"3rem"}}>{singleBlog.desc}</h2>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetails;

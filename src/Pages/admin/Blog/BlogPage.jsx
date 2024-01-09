import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Blog Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
    },
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
      render: (title) => <b>{title}</b>,
    },
    {
      title: "Açıklama",
      dataIndex: "desc",
      key: "desc",
      render: (desc) => <span>{desc}</span>,
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/blog/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Blogu Sil"
            description="Blogu silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteBlog(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const fetchBlog = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/blog`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Veri getirme başarısız.");
      }
    } catch (error) {
      console.log("Veri hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(`${apiUrl}/api/blog/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Blog başarıyla silindi.");
        fetchBlog();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default BlogPage;

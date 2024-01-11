import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const columns = [
    {
      title: "Logo Resim",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        // iki button arasında boşluk oluşturur
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/alfa/logo/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Logoyu Sil"
            description="Logoyu silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteLogo(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchLogo = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/logo`);

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

  const deleteLogo = async (logoId) => {
    try {
      const response = await fetch(`${apiUrl}/api/logo/${logoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Logo başarıyla silindi.");
        fetchLogo();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default LogoPage;

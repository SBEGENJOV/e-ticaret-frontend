import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SliderPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const columns = [
    {
      title: "Slider Resim",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
    },
    {
      title: "İsim",
      dataIndex: "name",
      key: "isim",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Aktiflik",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) =>(isActive ? <b>Slider Aktif</b> : <b>Slider Aktif Degil</b>),
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        // iki button arasında boşluk oluşturur
        <Space>
          <Popconfirm
            title="Slideri Etkinleştir"
            description="Slideri etkinleştirmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => activeSlider(record._id)}
          >
            <Button type="default" >
              Durum Degiştir
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/slider/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Slideri Sil"
            description="Slideri silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchSlider = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/slider`);

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

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/slider/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Slider başarıyla silindi.");
        fetchSlider();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };
  const activeSlider = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/slider/active/${categoryId}`, {
        method: "PUT",
      });

      if (response.ok) {
        message.success("Slider başarıyla etkinleştirildi.");
        fetchSlider();
      } else {
        message.error("Etkinleştirme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Etkinleştirme hatası:", error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, [fetchSlider]);
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </>
  );
};

export default SliderPage;

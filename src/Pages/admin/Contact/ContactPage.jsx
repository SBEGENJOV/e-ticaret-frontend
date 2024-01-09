import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const ContactPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
      render: (name) => <b>{name}</b>,
    },
    {
      title: "E-Mail",
      dataIndex: "mail",
      key: "mail",
      render: (mail) => <b>{mail}</b>,
    },
    {
      title: "Konu",
      dataIndex: "subject",
      key: "subject",
      render: (subject) => <b>{subject}</b>,
    },
    {
      title: "İçerik",
      dataIndex: "content",
      key: "content",
      render: (content) => <b>{content}</b>,
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        // iki button arasında boşluk oluşturur
        <Popconfirm
          title="Soruyu Sil"
          description="Soruyı silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteContact(record._id)}
        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchContact = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/contact`);

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

  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`${apiUrl}/api/contact/${contactId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Soru başarıyla silindi.");
        fetchContact();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ContactPage;

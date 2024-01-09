import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const blogId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/blog/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
      } else {
        message.error("Kategori güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/blog/${blogId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          //otomatik doldurma işlemi yapması için kullanıldı
          form.setFieldsValue({
            title: data.title,
            img: data.img,
            desc: data.desc,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [apiUrl, blogId, form]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Blog İsmi"
          name="title"
          rules={[
            {
              required: true,
              message: "Lütfen Blog adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Blog Açıklaması"
          name="desc"
          rules={[
            {
              required: true,
              message: "Lütfen Blog açıklamasını girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Blog Açıklamasını Girin"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Blog Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen Blog görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateBlogPage;

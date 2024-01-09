import { Button, Form, Input, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const CreateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    const imgLinks = values.img;
    const title = values.title;
    const desc = values.desc;
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          title,
          desc,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("Blog başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("BLog oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Blog oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Blog Başlıgı"
          name="title"
          rules={[
            {
              required: true,
              message: "Lütfen Blog başlıgını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Açıklama"
          name="desc"
          rules={[
            {
              required: true,
              message: "Lütfen Blog içregini girin!",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Blog Açıklamasını girin"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün görsel linki girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Blog Göreselini Girin"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateBlogPage;

import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const logoId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/logo/${logoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Logo başarıyla güncellendi.");
      } else {
        message.error("Logo güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Logo güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleLogo = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/logo/${logoId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        if (data) {
          //otomatik doldurma işlemi yapması için kullanıldı
          form.setFieldsValue({
            name: data.name,
            //formun name kısımına datadan gelen degeri yaz
            img: data.img,
            //formun name kısımına datadan gelen degeri yaz
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleLogo();
  }, [apiUrl, logoId, form]);

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
          label="Logo İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Logo adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Logo Link"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen Logo linkini girin!",
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

export default UpdateCategoryPage;

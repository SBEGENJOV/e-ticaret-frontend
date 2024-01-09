import { Button, Form, Input, Select, Spin, message } from "antd";
import { useState } from "react";

const CreateSliderPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Slider başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Slider oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Slider güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };
  const options = [
    {
      value: true,
      label: "Aktif",
    },
    {
      value: false,
      label: "Aktif Degil",
    },
  ];

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Slider İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Slider adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slider Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slider Durum Seç"
          name="isActive"
          rules={[
            {
              required: true,
              message: "Lütfen bir durum seçiniz girin!",
            },
          ]}
        >
          <Select>
            {options.map((options) => (
              <Select.Option key={0} value={options.value}>
                {options.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateSliderPage;

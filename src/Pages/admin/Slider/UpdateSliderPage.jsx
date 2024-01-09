import { Button, Form, Input, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateSliderPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const sliderId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slider/${sliderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Slider başarıyla güncellendi.");
      } else {
        message.error("Slider güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Slider güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleSlider = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/slider/${sliderId}`);

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
            isActive: data.isActive,
            //formun name kısımına datadan gelen degeri yaz
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleSlider();
  }, [apiUrl, sliderId, form]);
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
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Slider İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen slider adını girin!",
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
              message: "Lütfen slider görsel linkini girin!",
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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateSliderPage;

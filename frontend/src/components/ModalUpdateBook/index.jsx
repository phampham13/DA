import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalForm = ({ visible, onCancel, onSave, book }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(book ? book.coverImg : null);

  useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
      setImageUrl(book.coverImg);
    } else {
      form.resetFields();
      setImageUrl(null);
    }
  }, [book, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({ ...values, coverImg: imageUrl });
        form.resetFields();
        setImageUrl(null);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
      // Get this url from response in real world.
      setImageUrl(file.response.url);
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      title={book ? "Edit Book" : "Add Book"}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="bookForm">
        <Form.Item
          name="bookId"
          label="Mã sách"
          rules={[{ required: true, message: "Please input the book ID!" }]}
        >
          <Input disabled={!!book} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên sách"
          rules={[{ required: true, message: "Please input the book name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="categoryName"
          label="Thể loại"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantityTotal"
          label="Tổng số lượng"
          rules={[
            { required: true, message: "Please input the total quantity!" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="quantityAvailabel"
          label="Số lượng sẵn có"
          rules={[
            { required: true, message: "Please input the available quantity!" },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="coverImg"
          label="Hình ảnh"
          rules={[
            { required: true, message: "Please input the cover image URL!" },
          ]}
        >
          <Upload
            name="coverImg"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/upload" // URL to your upload endpoint
            onChange={handleImageChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="cover" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;

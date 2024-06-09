import { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";

import UploadImage from "../Upload/UploadImage";
import { ApiBOOK } from "../../services/Book/BookService";
const ModalForm = ({ visible, onCancel, onSave, book }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(book ? book.coverImg : "");

  useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
      setImageUrl(book.coverImg);
    } else {
      form.resetFields();
      setImageUrl("");
    }
  }, [book, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(book);

        values.coverImg = imageUrl; // Include the updated image URL
        console.log(values.coverImg);
        onSave(values);
        const res = ApiBOOK.UpdateBook(book._id, values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleUploadComplete = (url) => {
    setImageUrl(url);
  };

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
            { required: true, message: "Please upload the cover image!" },
          ]}
        >
          <UploadImage onUploadComplete={handleUploadComplete} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Cover"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;

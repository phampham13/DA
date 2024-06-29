import { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Button, Select } from "antd";
import { toast } from "react-toastify";

import UploadImage from "../Upload/UploadImage";
import { ApiBOOK } from "../../services/BookService";
const { Option } = Select;
const { TextArea } = Input;
const ModalForm = ({ visible, onCancel, onSave, book }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(book ? book.coverImg : "");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCate();
    if (book) {
      form.setFieldsValue(book);
      setImageUrl(book.coverImg);
    } else {
      form.resetFields();
      setImageUrl("");
    }
  }, [book, form]);
  const getAllCate = async () => {
    const res = await ApiBOOK.getAllCate();
    setCategories(res.data);
  };
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        values.coverImg = imageUrl; // Include the updated image URL
        onSave(values);
        console.log(values);
        let res = {};
        if (book) {
          res = ApiBOOK.UpdateBook(book._id, values).then((res) => {
            toast.success("Update thành công");
          });
        } else {
          console.log(values);
          res = ApiBOOK.AddBook(values).then((res) => {
            toast.success("Tạo thành công");
          });
        }

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
      open={visible}
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
        {!book && (
          <>
            <Form.Item
              name="author"
              label="Tác giả"
              rules={[
                { required: true, message: "Please input the author name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="publisher"
              label="Nhà xuất bản"
              rules={[
                { required: true, message: "Please input the publisher name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="categoryName"
          label="Thể loại"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
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
          name="quantityAvailable"
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
            { required: book, message: "Please upload the cover image!" },
          ]}
        >
          <UploadImage onUploadComplete={handleUploadComplete} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Cover"
              style={{
                width: "30%",
                height: "30%",
                marginTop: "10px",
                marginLeft: "35%",
                objectFit: "contain",
              }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;

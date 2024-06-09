import classNames from "classnames/bind";
import styles from "./BookList.module.scss";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import customStyles from "./CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ModalBookDetail from "./ModalBookDetail";
import {
  fetchBooks,
  selectAllBooks,
  deleteBook,
} from "../../../redux/slides/booksSlice";

import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import ModalForm from "../../../components/ModalUpdateBook";
import { useMutationHooks } from "../../../hooks/useMutationHook";
const cx = classNames.bind(styles);

import { FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { ApiBOOK } from "../../../services/Book/BookService";
const BookList = () => {
  const [data, setData] = useState([]);
  const [request, setRequest] = useState({
    limit: 20,
    page: 0,
    sort: "quantityTotal",
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addModal, setAddModal] = useState(false);

  const [IdDelete, setIdDelete] = useState();
  const [reload, setReload] = useState(false);

  const [selectedRow, setSelectedRow] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalUp, setShowModalUp] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getAll();
  }, [reload]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getAll = async () => {
    const res = await ApiBOOK.getAllBook(
      request.limit,
      request.page,
      request.sort
    );
    console.log(res);
    setData(res.data);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Mã sách",
      dataIndex: "bookId",
      showSorterTooltip: {
        target: "full-header",
      },

      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (_, record) => {
        return (
          <>
            <span
              className="cursor-pointer"
              onClick={() => handleDetail(record)}
            >
              {record.bookId}
            </span>
          </>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: [],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      ...getColumnSearchProps("name"),
      render: (_, record) => {
        return (
          <>
            <span
              className="cursor-pointer"
              onClick={() => handleDetail(record)}
            >
              {record.name}
            </span>
          </>
        );
      },
    },
    {
      title: "Thể loại",
      dataIndex: "categoryName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.categoryName - b.categoryName,
      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Tổng số lượng",
      dataIndex: "quantityTotal",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.quantityTotal - b.quantityTotal,
    },
    {
      title: "Số lượng sẵn có",
      dataIndex: "quantityAvailabel",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.quantityAvailabel - b.quantityAvailabel,
    },
    {
      title: "Hình ảnh",
      dataIndex: "coverImg",
      render: (_, record) => {
        return (
          <div className={cx("image-cell")}>
            <img width="45px" height="60px" src={record.coverImg} alt="" />
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <>
            <div className="flex justify-between">
              <span className={cx("editbtn")}>
                <FaPen
                  onClick={() => handleEdit(record)}
                  className="text-lg cursor-pointer"
                />
              </span>
              <span className={cx("colortext")}>
                <AiFillDelete
                  onClick={() => handleDelete1(record._id)}
                  className="text-lg"
                />
              </span>
            </div>
          </>
        );
      },
    },
  ];
  const dataTable = data?.map((book) => {
    return { ...book, key: book._id };
  });
  const handleDetail = (book) => {
    setSelectedRow(book);
    console.log(selectedRow);
    setShowModal(true);
  };
  const handleEdit = (book) => {
    setSelectedRow(book);
    setShowModalUp(true);
  };
  const handleDelete1 = async (id) => {
    setShowDeleteModal(!showDeleteModal);
    setIdDelete(id);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys.length);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handleCategoryChange = (e) => {
    console.log(e);
  };
  function handleSearchTab() {
    console.log("kiếm e", keyword);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalUP = () => {
    setShowModalUp(false);
  };
  const handleCloseModalAdd = () => {
    setAddModal(false);
  };
  const handleSave = (book) => {
    setReload(!reload);

    setShowModalUp(false);
    setAddModal(false);
  };
  const handleDelete = () => {
    ApiBOOK.DeleteBook(IdDelete)
      .then((res) => {
        if (res) {
          toast.success("Xóa sách thành công");
          setIdDelete(null);
          setShowDeleteModal(false);
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        toast.error("Xóa sách thất bại");
      });
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowAdd = () => {
    setAddModal(true);
  };
  const handleDeleteMany = async () => {
    console.log(selectedRowKeys);
    const ids = [...selectedRowKeys];
    const res = await ApiBOOK.DeleteManyBook(ids);
    setReload(!reload);
    if (res) {
      toast.success("Xóa thành công");
    }
  };
  return (
    <>
      <div className={cx("wrap")}>
        <div className={cx("topBar")}>
          <Button onClick={handleShowAdd} className={cx("create-btn")}>
            Thêm sách
          </Button>
          {selectedRowKeys.length >= 2 && (
            <>
              <Button onClick={handleDeleteMany} className={cx("create-btn")}>
                Xóa tất cả
              </Button>
            </>
          )}
        </div>

        <div className={cx("search-element")}>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Tất cả loại</option>
            {categories &&
              categories.map((category) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
          </select>
          <div className={cx("search-bar")}>
            <input
              type="text"
              className={cx("search-box")}
              placeholder="Tìm kiếm theo tên sản phẩm"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className={cx("search-btn")} onClick={handleSearchTab}>
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </button>
          </div>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataTable}
          onChange={onChange}
          pagination={{
            pageSize: 10,
            total: request.limit,
          }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận hủy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn chắc chắn muốn xóa sách{selectedRow.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("btn-close-modal")}
              style={{ backgroundColor: "#36a2eb" }}
              onClick={handleCloseDeleteModal}
            >
              Hủy
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết sách</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalBookDetail book={selectedRow} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("btn-close-modal")}
              style={{ backgroundColor: "#36a2eb" }}
              onClick={handleCloseModal}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        <ModalForm
          visible={showModalUp}
          onCancel={handleCloseModalUP}
          onSave={handleSave}
          book={selectedRow}
        />
        <ModalForm
          visible={addModal}
          onCancel={handleCloseModalAdd}
          onSave={handleSave}
        />
      </div>
    </>
  );
};

export default BookList;

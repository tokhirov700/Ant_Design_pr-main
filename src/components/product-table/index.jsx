
import { Table, Button, notification } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { products } from '../../service';
import { NavLink } from 'react-router-dom';
import  { useState } from 'react';
import { ProductModal } from '../../components';

// eslint-disable-next-line react/prop-types
const ProductTable = ({ productData,  }) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});

  const handleDelete = async (id) => {
    try {
      await products.delete(id);
      notification.success({ message: 'Product deleted successfully!' });

    } catch (error) {
      notification.error({ message: 'Failed to delete product.' });
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (item) => {
    setUpdate(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'T/R',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(item)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(item.id)}
          />
          <Button>
            <NavLink to={`${item.id}`}>
              <InfoCircleOutlined />
            </NavLink>
          </Button>
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <ProductModal open={open} handleClose={handleClose} update={update} />
      <Table
        columns={columns}
        dataSource={productData}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default ProductTable;

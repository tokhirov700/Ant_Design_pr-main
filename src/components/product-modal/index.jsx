import { useState, useEffect } from 'react';
import { Button, Modal, Input, notification } from 'antd';
import { categories } from '../../service';

const App = ({ open, handleClose, update: initialUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [update, setUpdate] = useState(initialUpdate);

  const showModal = () => {
    setIsModalOpen(true);
    if (update) {
      setInputValue(update.name);
    } else {
      setInputValue('');
    }
  };

  const handleOk = async () => {
    try {
      if (update?.id) {
        await categories.put(update.id, { name: inputValue }); // Update category
      } else {
        await categories.create({ name: inputValue }); // Create new category
      }
      handleClose(); // Close modal without reloading
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while saving the category. Please try again.',
      });
    } finally {
      setIsModalOpen(false);
      setInputValue('');
      setUpdate(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputValue('');
    setUpdate(null); 
    handleClose(); // Ensure to call the handleClose function to update the parent state if needed
  };

  useEffect(() => {
    if (open) {
      showModal();
    } else {
      setIsModalOpen(false);
    }
  }, [open, initialUpdate]); // Added initialUpdate to the dependency array

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal 
        title="Category Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null} // Remove default footer
      >
        <Input 
          placeholder="Enter category name" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default App;

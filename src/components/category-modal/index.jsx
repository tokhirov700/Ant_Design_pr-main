import { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { categories } from '../../service';

// eslint-disable-next-line react/prop-types
const App = ({ handleClose, update: initialUpdate}) => {
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

  const handleOk  = async () => {
    try {
      if (update?.id) {
        await categories.put(update.id, { name: inputValue });
        message.success('Category updated successfully!');
      } else {
        await categories.create({ name: inputValue });
        message.success('Category created successfully!');
      }
      handleClose(); 
    } catch (error) {
      console.error("Error occurred:", error);
      message.error('An error occurred while saving the category.');
    } finally {
      setInputValue('');
      setUpdate(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputValue('');
    setUpdate(null); 
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal 
        title="Product Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <Input 
          placeholder="Enter product name" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default App;


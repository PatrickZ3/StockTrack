import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ProductModalProp {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'add' | 'edit';
    productId?: string;
    initialData?: {
        name: string;
        description: string;
        quantity: number;
        price: number;
        category: string;
        status: string;
    };
}

function ProductModal({ isOpen, onClose, mode = 'add', productId, initialData }: ProductModalProp) {
    const [formData, setFormData] = useState(
        initialData || {
            name: '',
            description: '',
            quantity: 0,
            price: 0.0,
            category: '',
            status: 'active',
        });

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                quantity: initialData.quantity || 0,
                price: initialData.price || 0.0,
                category: initialData.category || '',
                status: initialData.status || 'active',
            });
        } else if (mode === 'add') {
            setFormData({
                name: '',
                description: '',
                quantity: 0,
                price: 0.0,
                category: '',
                status: 'active',
            });
        }
    }, [initialData, mode, isOpen])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found");
                return;
            }
            const url =
                mode === "add"
                    ? "http://localhost:4000/products"
                    : `http://localhost:4000/products/${productId}`;

            const response = await fetch(url, {
                method: mode === "add" ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Product save response", data);

            if (!data.success) {
                alert(data.message || "Error saving products");
                return;
            }

            onClose();
            window.location.reload();

        } catch (error: any) {
            console.error("Error saving product", error)
        }
    }

    return (
        <Modal show={isOpen} onHide={onClose} centered size="lg" dialogClassName='wideModal'>
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title className='formTitle'>{mode === 'add' ? 'Add New Product' : 'Edit Product'}</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBody'>
                <Form>
                    <div className="modalFormGrid">
                        <div className="modalLeft">
                            <Form.Group>
                                <Form.Label className="formLabel">Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="formInput"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="formLabel">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Enter description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="formInput"
                                />
                            </Form.Group>
                        </div>
                        <div className="modalRight">
                            <Form.Group>
                                <Form.Label className="formLabel">Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="formInput"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="formLabel">Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="formInput"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="formLabel">Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="formInput"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="formLabel">Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="formInput"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="archived">Archived</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} className='formButton'>
                    Cancel
                </Button>
                {mode === 'edit' && (
                    <Button
                        variant="danger"
                        onClick={() => {
                            console.log('Delete product:', formData.name);
                            // TODO: replace with your actual delete logic later
                            onClose();
                        }}
                        className="formButton"
                    >
                        Delete
                    </Button>
                )}
                <Button variant="primary" onClick={handleSave} className='formButton'>
                    {mode === 'add' ? 'Save Product' : 'Update Product'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;

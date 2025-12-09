import { useState } from 'react';
import { OverviewProps } from '../../types/items';
import AddProduct from '../buttons/add-product-button';
import SearchBar from '../input/search-bar';
import Status from '../buttons/status';
import Category from '../buttons/category';
import ProductModal from '../modals/productModal';
import { Pencil, Plus } from 'lucide-react';

function Card({ data }: OverviewProps) {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredData = data.filter((item) => {
    const matchesSearches = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesCategories = selectedCategories === 'All' || item.category === selectedCategories;
    return matchesSearches && matchesStatus && matchesCategories;
  }
  );
  const statuses = Array.from(new Set(data.map((item) => item.status).filter(Boolean)));

  const categories = Array.from(new Set(data.map((item) => item.category).filter(Boolean)));

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  }

  
  return (
    <div>
      <div className='controlBar'>
        <SearchBar onSearch={setSearchTerm} />
        <Category categories={categories} onSelectCategory={setSelectedCategories} />
        <Status statuses={statuses} onSelectStatus={setSelectedStatus} />
        <AddProduct />
      </div>
      <div className='productLog'>
        {filteredData.map((item, index) => (
          <div key={item.id} className='card'>
            <div className="cardHeader">
              <div className='cardName' style={{ fontWeight: 800 }}>{item.name}</div>
              <div className={`cardStatus ${item.status.toLowerCase()}`}>{item.status}</div>
            </div>
            <div className='cardDescription'>
              <div>{item.description}</div>
            </div>
            <div className='cardItem'>
              <div className='cardName'>Quantity</div>
              <div className='cardQuantity'>{item.quantity} Units</div>
            </div>
            <div className='cardItem'>
              <div className='cardName'>Price</div>
              <div className='cardPrice'>$ {item.price}</div>
            </div>
            <div className='cardItem'>
              <div className='cardName'>Category</div>
              <div className='cardCategory'>{item.category}</div>
            </div>
            <div className='cardFooter'>
              <div className='cardDivider'></div>
              <div className='cardFooterContent'>
                <div className='cardFooterLeft'>
                  <div className='cardDate'>
                    {new Date(item.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className='cardFooterRight'>
                  <div className='footerButton'>
                    Add To Cart<Plus size={14} />
                  </div>
                  <div className='footerButton' onClick={() => handleCardClick(item)}>
                    Edit<Pencil size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode="edit"
        productId={selectedProduct?.id}    
        initialData={selectedProduct}
      />
    </div>

  );
}

export default Card;

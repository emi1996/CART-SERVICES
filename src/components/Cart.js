import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItems ,removeFromCart}) => {

console.log("cartItems",cartItems);
const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    { field: 'price', headerName: 'Price' },
    {
      field: 'totalprice',
      headerName: 'Total Price',
      renderCell: (params) => {
        const { row } = params;
        return row.newprice !== undefined ? row.newprice : row.price;
      },
    },
    { field: 'quantity', headerName: 'Quantity' },
      {
        field: 'removeFromCart',
        headerName: 'Remove from Cart',
        width: 150,
        renderCell: (params) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => removeFromCart(params.row.id)}
              style={{ backgroundColor: '#FF6962', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
            >
              <FontAwesomeIcon icon={faMinus} style={{ fontSize: '20px' }} />
            </button>
          </div>
        ),
      },
  ];
  
  return (
    <div>
      <h2>Shopping Cart</h2>

      <DataGrid
        rows={cartItems}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
};

export default Cart;

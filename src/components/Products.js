import React from 'react';

const Products = () => {

  return (

    <div style={{textAlign: 'center'}}>
       <h2>Sorry For The Inconvinience</h2>
       <h3>This is currently under development</h3>
       <button style={{backgroundColor:'blue', color:'white'}}
       onClick={(e) => { window.location = "/" }}>Home</button>
    </div>
  );
}

export default Products;
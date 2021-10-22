import React from 'react';
function ProductOverview({ overview }) {
  return (
    <div className='productOverview'>
      <table>
        <tbody>
          {overview?.items?.map(item => (
            <tr className='productOverview__item' key={item.id}>
              <td>
                <strong>{item.key}</strong>
              </td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductOverview;

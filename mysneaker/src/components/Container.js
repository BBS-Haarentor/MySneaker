import React from 'react';

const Container = ({data}) => {
  return <div className='w-fit h-fit p-4 bg-orange-400 rounded-3xl'>
     <table>
        <tbody>
            <tr className='p-4'> 
                   <td className='p-4'><a>test</a></td>
                   <td className='p-4'><a>test</a></td>
            </tr>
            <tr className='p-4'> 
                   <td className='p-4'><a>test</a></td>
                   <td className='p-4'><a>test</a></td>
            </tr>
        </tbody>
    </table>
  </div>;
};

export default Container;


import React from 'react';

import DescriptionConst from '../descriptions/DescriptionConst';


function BlockConst(props) {

    const block = props.block

    return (
        <div className="block block-const" style={{ backgroundColor: block.color,}}>
            {block.complex === 0 ?          
                <DescriptionConst block={block} list_num={0}></DescriptionConst> 
                :
                Array(block.complex).fill(null).map((list_value, list_num) => (
                    <div key={list_num}>
                        <div className='description'> <DescriptionConst key={list_num} block={block} list_num={list_num}></DescriptionConst> </div>
                        <div className='board'> </div> 
                    </div>
                )) }
        </div>
    );
}
export default BlockConst;
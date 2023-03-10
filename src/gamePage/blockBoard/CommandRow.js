import './blockBoard.css'
import React from 'react';

function CommandRow(props) {

    const row = props.row

    return (
        <div className="command_row">
            {row.row_number}
        </div>
      );
}

export default CommandRow;
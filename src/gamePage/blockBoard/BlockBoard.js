import CommandRow from './CommandRow';


function BlockBoard(props) {

    const solution = props.solution

    return (
        <div>
            <p>Block Board</p>
            {solution.map((row) => {return <CommandRow key={row.row_number} row={row}> </CommandRow>})}
        </div>
      );
}

export default BlockBoard;
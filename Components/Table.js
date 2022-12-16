import styled from "styled-components";

const TableRow = styled.tr`

`

const TableCell = styled.td`
    font-size: ${props => props.theme.fontSize.xs};
    border-bottom: 1px solid ${props => props.theme.color.colorFgPrimary};
    padding: ${props => props.theme.space.xs} 0;
    &:last-child {
        text-align: right;
    }
    
`





function Table({tableData}) {
    return ( 
        <table>
            <tbody>
                {tableData.columns ? <TableRow>{tableData.columns.map((column) => <th key={column}>{column}</th>)}</TableRow> : null}

                {tableData.rows.map((row) => (<TableRow key={row}>
                    {Object.keys(row).map((key) => <TableCell key={key}>{row[key]}</TableCell>)}
                </TableRow>))}
            </tbody>
        </table>
     );
}

export default Table;
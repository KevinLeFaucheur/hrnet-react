export const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => <td key={column.data}>{column.title}</td>)}
      </tr>
    </thead>
  )
}

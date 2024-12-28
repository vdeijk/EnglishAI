import styles from "./Table.module.css";

interface TableProps<T> {
  columns: { header: string; accessor: keyof T }[];
  data: T[];
}

const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor as string}>{String(row[column.accessor])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import "./DataTable.css";

interface DataTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  pageSize?: number; // default 10
  loading?: boolean;
}

const DataTable = <T extends { id?: string | number }>({
  columns,
  data,
  pageSize = 10,
  loading = false,
}: DataTableProps<T>) => {
  // Add horizontal + vertical centering to all columns
  const centeredColumns = columns.map((col) => ({
    ...col,
    align: "center" as const,
    className: "cell-center",
  }));

  return (
    <Table
      className="data-table"
      columns={centeredColumns}
      dataSource={data}
      rowKey={(record) => record.id ?? Math.random()}
      loading={loading}
      scroll={{ x: "max-content" }}
      locale={{ emptyText: "No clients to display." }}
      pagination={{
        pageSize,
        showSizeChanger: false, // no page size dropdown
        hideOnSinglePage: false, // always show pagination
        showTotal: (total, range) =>
          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        simple: false,
      }}
    />
  );
};

export default DataTable;

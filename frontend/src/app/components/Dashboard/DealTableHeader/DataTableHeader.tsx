import { Row, Space, Button, Input, Select, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./DataTableHeader.css";
import { ReactNode, useState } from "react";

const { Title } = Typography;

interface Props {
  title: string;
  pageSize: number;
  onPageSizeChange: (v: number) => void;
  totalCount: number;
  onSearch: (value: string) => void;
  showAddButton?: boolean;
  AddModal?: (open: boolean, onClose: () => void) => React.ReactNode;
  addButtonIcon?: ReactNode;
}

const DataTableHeader = ({
  title,
  pageSize,
  onPageSizeChange,
  totalCount,
  onSearch,
  showAddButton = false,
  AddModal,
  addButtonIcon,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Row className="data-table-header">
      <Title level={4} style={{ margin: 0, color: "var(--background)" }}>
        {title} ({totalCount})
      </Title>

      <Space size={0}>
        {showAddButton && AddModal && (
          <>
            <Button
              type="primary"
              icon={addButtonIcon || <FontAwesomeIcon icon={faPlus} />}
              className="plus-button"
              onClick={() => setOpen(true)}
            />

            {AddModal(open, () => setOpen(false))}
          </>
        )}

        <Input
          placeholder="Search"
          prefix={<FontAwesomeIcon icon={faSearch} />}
          className={`search-input ${showAddButton ? "" : "without-add-button"}`}
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />

        <Select
          value={pageSize > 0 ? pageSize : totalCount}
          onChange={(value) =>
            onPageSizeChange(value === -1 ? totalCount : value)
          }
          suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
          className={`pagination-select ${showAddButton ? "" : "without-add-button"}`}
        >
          <Select.Option value={10}>10</Select.Option>
          <Select.Option value={25}>25</Select.Option>
          <Select.Option value={50}>50</Select.Option>
          <Select.Option value={100}>100</Select.Option>
          <Select.Option value={-1}>All</Select.Option>
        </Select>
      </Space>
    </Row>
  );
};

export default DataTableHeader;

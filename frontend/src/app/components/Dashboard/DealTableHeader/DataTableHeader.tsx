import { Row, Space, Button, Input, Select, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./DataTableHeader.css";
import { useState } from "react";
import DealTicketCreateModal from "../DealTicketCreateModal/DealTicketCreateModal";

const { Title } = Typography;

interface Props {
  title: string;
  pageSize: number;
  onPageSizeChange: (v: number) => void;
  totalCount: number;
  onSearch: (value: string) => void;
}

const DataTableHeader = ({
  title,
  pageSize,
  onPageSizeChange,
  totalCount,
  onSearch,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Row className="data-table-header">
      <Title level={4} style={{ margin: 0, color: "var(--background)" }}>
        {title}
      </Title>

      <Space size={0}>
        <>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            className="plus-button"
            onClick={() => setOpen(true)}
          />

          <DealTicketCreateModal open={open} onClose={() => setOpen(false)} />
        </>

        <Input
          placeholder="Search"
          prefix={<FontAwesomeIcon icon={faSearch} />}
          className="search-input"
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />

        <Select
          value={pageSize > 0 ? pageSize : totalCount}
          onChange={(value) =>
            onPageSizeChange(value === -1 ? totalCount : value)
          }
          suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
          className="pagination-select"
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

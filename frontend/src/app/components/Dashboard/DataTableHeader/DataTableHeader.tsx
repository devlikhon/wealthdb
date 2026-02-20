import { Row, Space, Button, Input, Select, Typography, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./DataTableHeader.css";
import { useState } from "react";
import { JSX } from "react/jsx-dev-runtime";

const { Title } = Typography;

interface Props {
  title: string;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
  onSearch: (text: string) => void;
  modals?: {
    title: string; // tooltip text
    icon: React.ReactNode;
    buttonClassName?: string; // 👈 add this
    ModalComponent: (open: boolean, onClose: () => void) => JSX.Element;
  }[];
}

const DataTableHeader = ({
  title,
  pageSize,
  onPageSizeChange,
  totalCount,
  onSearch,
  modals = [],
}: Props) => {
  // States for dynamic modals
  const [modalStates, setModalStates] = useState(modals.map(() => false));

  const openModal = (index: number) => {
    const newStates = [...modalStates];
    newStates[index] = true;
    setModalStates(newStates);
  };

  const closeModal = (index: number) => {
    const newStates = [...modalStates];
    newStates[index] = false;
    setModalStates(newStates);
  };

  return (
    <Row className="data-table-header">
      <Title level={4} style={{ margin: 0, color: "var(--foreground)" }}>
        {title} ({totalCount})
      </Title>

      <Space size={0}>
        {/* Dynamic modals from props */}
        {modals.map((modal, index) => (
          <span key={index}>
            <Tooltip title={modal.title}>
              <Button
                type="default"
                icon={modal.icon}
                onClick={() => openModal(index)}
                // className="modal-btn"
                className={`modal-btn ${modal.buttonClassName ?? ""}`}
              />
            </Tooltip>

            {modal.ModalComponent(modalStates[index], () => closeModal(index))}
          </span>
        ))}

        {/* Search Input */}
        <Input
          placeholder="Search"
          prefix={<FontAwesomeIcon icon={faSearch} />}
          className={`search-input ${modals.length ? "with-add-button" : "without-add-button"}`}
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* Page Size Select */}
        <Select
          value={pageSize > 0 ? pageSize : totalCount}
          onChange={(value) =>
            onPageSizeChange(value === -1 ? totalCount : value)
          }
          suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
          className={`pagination-select ${modals.length ? "" : "without-add-button"}`}
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

// import { Row, Space, Button, Input, Select, Typography } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronDown,
//   faPlus,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import "./DataTableHeader.css";
// import { ReactNode, useState } from "react";

// const { Title } = Typography;

// interface Props {
//   title: string;
//   pageSize: number;
//   onPageSizeChange: (v: number) => void;
//   totalCount: number;
//   onSearch: (value: string) => void;
//   showAddButton?: boolean;
//   AddModal?: (open: boolean, onClose: () => void) => React.ReactNode;
//   addButtonIcon?: ReactNode;
// }

// const DataTableHeader = ({
//   title,
//   pageSize,
//   onPageSizeChange,
//   totalCount,
//   onSearch,
//   showAddButton = false,
//   AddModal,
//   addButtonIcon,
// }: Props) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Row className="data-table-header">
//       <Title level={4} style={{ margin: 0, color: "var(--background)" }}>
//         {title} ({totalCount})
//       </Title>

//       <Space size={0}>
//         {showAddButton && AddModal && (
//           <>
//             <Button
//               type="primary"
//               icon={addButtonIcon || <FontAwesomeIcon icon={faPlus} />}
//               className="plus-button"
//               onClick={() => setOpen(true)}
//             />

//             {AddModal(open, () => setOpen(false))}
//           </>
//         )}

//         <Input
//           placeholder="Search"
//           prefix={<FontAwesomeIcon icon={faSearch} />}
//           className={`search-input ${showAddButton ? "" : "without-add-button"}`}
//           allowClear
//           onChange={(e) => onSearch(e.target.value)}
//         />

//         <Select
//           value={pageSize > 0 ? pageSize : totalCount}
//           onChange={(value) =>
//             onPageSizeChange(value === -1 ? totalCount : value)
//           }
//           suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
//           className={`pagination-select ${showAddButton ? "" : "without-add-button"}`}
//         >
//           <Select.Option value={10}>10</Select.Option>
//           <Select.Option value={25}>25</Select.Option>
//           <Select.Option value={50}>50</Select.Option>
//           <Select.Option value={100}>100</Select.Option>
//           <Select.Option value={-1}>All</Select.Option>
//         </Select>
//       </Space>
//     </Row>
//   );
// };

// export default DataTableHeader;

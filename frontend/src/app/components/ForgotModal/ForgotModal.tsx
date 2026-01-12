"use client";

import { Modal, Button } from "antd";
import "./ForgotModal.css";

interface ForgotModalProps {
  open: boolean;
  type: "email" | "password" | null;
  onClose: () => void;
}

const ForgotModal = ({ open, type, onClose }: ForgotModalProps) => {
  return (
    <Modal
      open={open}
      getContainer={false}
      title={type === "email" ? "Forgot Email" : "Forgot Password"}
      onCancel={onClose}
      className="forgot-modal"
      footer={[
        <Button key="ok" type="primary" onClick={onClose}>
          OK
        </Button>,
      ]}
      centered
    >
      {type === "email" ? (
        <p>
          If you have forgotten your username or need any further assistance,
          please contact your Relationship Manager.
        </p>
      ) : (
        <p>
          If you have forgotten your password or need any further assistance,
          please contact your Relationship Manager.
        </p>
      )}
    </Modal>
  );
};

export default ForgotModal;

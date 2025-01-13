import React, { useState } from "react";
import { Modal, List, Typography, Space, Image } from "antd";
import moment from "moment";

const { Text } = Typography;

interface TrackOrderPopupProps {
  visible: boolean;
  onClose: () => void;
  pickLog: any[];
  deliverLog: any[];
}

const TrackOrderPopup: React.FC<TrackOrderPopupProps> = ({
  visible,
  onClose,
  pickLog,
  deliverLog,
}) => {
  // Kết hợp và sắp xếp log theo thời gian
  const combinedLogs = [...pickLog, ...deliverLog].sort(
    (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
  );

  return (
    <Modal
      title="Thông tin truy vết đơn hàng"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{
        maxHeight: "70vh", 
        overflowY: "auto", // Kích hoạt scroll dọc
        padding: "16px",
      }}
    >
      <List
        dataSource={combinedLogs}
        renderItem={(log) => (
          <List.Item style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>{moment(log.created).format("DD/MM/YYYY HH:mm:ss")}</Text>
              <div
                dangerouslySetInnerHTML={{ __html: log.desc }}
                style={{ color: "#333" }}
              />
              {log.image && (
                <Image
                  src={log.image}
                  alt="Log Image"
                  width={200}
                  style={{ marginTop: "8px" }}
                />
              )}
            </Space>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default TrackOrderPopup;

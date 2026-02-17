import DashboardSection from "../DashboardSection/DashboardSection";

interface QuadItem {
  title: string;
  value: string;
  description: string;
}

interface QuadSectionProps {
  header: string;
  items: QuadItem[];
  pieData: { type: string; value: number }[];
}

const QuadSection = ({ items, pieData }: QuadSectionProps) => {
  return (
    <DashboardSection
      header={`Application\nStatus`}
      mainStat={[
        {
          title: "Completed Applications",
          value: "50%",
          description: "A total of 3 of the 6 applications have been completed",
        },
      ]}
      items={items}
      pieData={pieData}
    />
  );
};

export default QuadSection;

// <Card
//   size="small"
//   title={
//     <div style={{ textAlign: "center", width: "100%", fontSize: 16 }}>
//       {header}
//     </div>
//   }
//   style={{
//     boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
//   }}
// >
//   <Row gutter={[24, 24]} align="middle">
//     {/* Pie */}
//     <Col xs={24} md={10}>
//       <DashboardPie
//         data={pieData}
//         title={`Application\nStatus`}
//         height={350}
//       />
//     </Col>

//     {/* Stats */}
//     <Col xs={24} md={14}>
//       <Row style={{ marginBottom: 16 }}>
//         <Col xs={24} md={24}>
//           <StatCard
//             title="Completed Applications"
//             value="50%"
//             description="A total of 3 of the 6 applications have been completed"
//           />
//         </Col>
//       </Row>
//       <Row gutter={[16, 16]}>
//         {items.map((item, index) => (
//           <Col xs={24} sm={12} key={index}>
//             <Card
//               size="small"
//               style={{
//                 boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
//               }}
//             >
//               <Text type="secondary">{item.title}</Text>
//               <Title level={5} style={{ margin: "5px 0" }}>
//                 {item.value}
//               </Title>
//               <Text>{item.description}</Text>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Col>
//   </Row>
// </Card>

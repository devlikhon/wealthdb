/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import dayjs from "dayjs";

const styles = StyleSheet.create({
  page: {
    padding: "30px 50px",
    backgroundColor: "#fff",
    position: "relative",
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  watermark: {
    position: "absolute",
    top: "45%",
    left: "5%",
    fontSize: 60,
    color: "#f3f4f6",
    transform: "rotate(-35deg)",
    textTransform: "uppercase",
  },

  header: {
    // marginBottom: 10,
  },

  logo: {
    width: 120,
    height: 30,
    objectFit: "contain",
    margin: "auto",
  },

  certificateTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2A68",
    textAlign: "center",
  },

  certificateSubTitle: {
    marginTop: 5,
    fontSize: 9,
    color: "#555",
    lineHeight: 1.5,
    textAlign: "center",
  },

  customerSection: {
    width: "100%",
    margin: "10px auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  //   customerInfo: {
  //     width: "60%",
  //   },

  customerName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
  },

  customerText: {
    fontSize: 8,
    color: "#444",
    marginBottom: 2,
    fontWeight: "bold",
  },

  certificateHeader: {
    backgroundColor: "#1F2A68",
    color: "#fff",
    padding: 8,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 10,
  },

  certificateBox: {
    border: "1 solid #d1d5db",
  },

  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
  },

  tableCellTitle: {
    width: "35%",
    padding: 8,
    fontSize: 9,
    fontWeight: "bold",
    // backgroundColor: "#f9fafb",
  },

  tableCellValue: {
    width: "65%",
    padding: 8,
    fontSize: 9,
  },

  amountSection: {
    margin: "15px auto",
    border: "2 solid #1F2A68",
    padding: 10,
    textAlign: "center",
    width: "100%",
  },

  amountLabel: {
    fontSize: 10,
    color: "#555",
  },

  amountValue: {
    marginTop: 5,
    fontSize: 16,
    color: "#1F2A68",
    fontWeight: "bold",
  },

  amountWords: {
    marginTop: 4,
    fontSize: 8,
    color: "#666",
  },

  termsSection: {
    // marginTop: 30,
  },

  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1F2A68",
  },

  term: {
    fontSize: 8,
    marginBottom: 3,
    color: "#444",
  },

  signatureSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  signatureBox: {
    width: "40%",
  },

  signature: {
    fontSize: 12,
    color: "#1F2A68",
    textAlign: "center",
    marginBottom: 4,
    // fontStyle: "italic",
    fontFamily: "Times-Italic",
  },

  signatureLine: {
    borderTop: "1 solid #000",
    marginBottom: 5,
  },

  signatureText: {
    fontSize: 9,
    textAlign: "center",
    color: "#444",
    fontWeight: "bold",
  },

  footer: {
    borderTop: "1 solid #d1d5db",
    paddingTop: 10,
    textAlign: "center",
    marginTop: "auto",
  },

  footerText: {
    fontSize: 8,
    color: "#666",
  },

  barandqrcode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  barcode: {
    width: 100,
    height: 30,
  },

  qrcode: {
    width: 50,
    height: 50,
  },
});

const BondCertificate = ({
  bond,
  currentUser,
  barcode,
  qrCode,
}: {
  bond: any;
  currentUser: any;
  barcode: string;
  qrCode: string;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>Deutsche Bank</Text>

        <View>
          {/* Header */}
          <View style={styles.header}>
            <Image
              src="/img/Deutsche-Bank-Logo.png"
              // preview={false}
              style={styles.logo}
            />

            <Text style={styles.certificateTitle}>
              Digital Bond Certificate
            </Text>

            <Text style={styles.certificateSubTitle}>
              This certificate confirms ownership of the investment bond listed
              below. It serves as proof of investment and is issued
              electronically by the company.
            </Text>
          </View>

          {/* Customer Info */}
          <View style={styles.customerSection}>
            <View>
              <Text style={styles.customerName}>
                {currentUser?.firstName} {currentUser?.lastName}
              </Text>

              <Text style={styles.customerText}>
                Certificate ID: {bond.bondNumber}
              </Text>
            </View>

            <View>
              <Text style={styles.customerText}>
                Email: {currentUser?.email}
              </Text>

              <Text style={styles.customerText}>
                Phone: {currentUser?.phoneNumber}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.certificateHeader}>Bond Information</Text>
          </View>

          {/* Bond Details */}
          <View style={styles.certificateBox}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Bond Number</Text>
              <Text style={styles.tableCellValue}>{bond.bondNumber}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Bond Name</Text>
              <Text style={styles.tableCellValue}>
                {bond.bondInvestmentOption}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Start Date</Text>
              <Text style={styles.tableCellValue}>
                {dayjs(bond.investedAt).format("DD MMM YYYY")}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Maturity Date</Text>
              <Text style={styles.tableCellValue}>
                {dayjs(bond.maturityDate).format("DD MMM YYYY")}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Interest Rate</Text>
              <Text style={styles.tableCellValue}>
                {bond.bondInvestmentOption === "Aviva" ? "6.125%" : "8.81%"}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Investment Amount</Text>
              <Text style={styles.tableCellValue}>
                {bond.investmentCurrency}{" "}
                {Number(bond.investmentAmount).toLocaleString()}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Total Interest</Text>
              <Text style={styles.tableCellValue}>
                {bond.investmentCurrency}{" "}
                {Number(bond.totalReturn).toLocaleString()}
              </Text>
            </View>

            <View style={[styles.tableRow, { borderBottom: 0 }]}>
              <Text style={styles.tableCellTitle}>Total Payable</Text>
              <Text
                style={[
                  styles.tableCellValue,
                  {
                    fontWeight: "bold",
                    color: "#1F2A68",
                  },
                ]}
              >
                {bond.investmentCurrency}{" "}
                {Number(bond.availableForWithdraw).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Highlight Amount */}
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Total Earned Value</Text>

            <Text style={styles.amountValue}>
              {bond.investmentCurrency}{" "}
              {Number(bond.availableForWithdraw).toLocaleString()}
            </Text>

            <Text style={styles.amountWords}>
              Certified By Investment Amount
            </Text>
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>

            <Text style={styles.term}>
              • This certificate is issued electronically.
            </Text>

            <Text style={styles.term}>
              • Ownership belongs solely to the certificate holder.
            </Text>

            <Text style={styles.term}>
              • Early withdrawal conditions may apply.
            </Text>

            <Text style={styles.term}>
              • Please retain this document for your records.
            </Text>

            <Text style={styles.term}>
              • This certificate may be verified through the company portal.
            </Text>
          </View>

          {/* Signature */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <Text style={styles.signature}>Deutsche Bank</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Authorized Signatory</Text>
            </View>

            <View style={styles.signatureBox}>
              <Text style={styles.signature}>
                {currentUser?.firstName} {currentUser?.lastName}
              </Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Certificate Holder</Text>
            </View>
          </View>
        </View>

        <View>
          {/* Barcode and QR Code Section */}
          <View style={styles.barandqrcode}>
            <Image src={barcode} style={styles.barcode} />

            <Image src={qrCode} style={styles.qrcode} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © Deutsche Bank Wealth Management | Investment Services | London,
              United Kingdom
            </Text>

            <Text style={styles.footerText}>
              Generated on {dayjs().format("DD MMM YYYY HH:mm")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BondCertificate;

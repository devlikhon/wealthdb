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
    left: "8%",
    fontSize: 60,
    color: "#f3f4f6",
    transform: "rotate(-35deg)",
    textTransform: "uppercase",
  },

  header: {
    // marginBottom: 10,
  },

  logoBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  logoBoxText: {
    fontSize: 10,
    width: "20%",
  },

  logo: {
    width: 30,
    height: 30,
    objectFit: "contain",
  },

  certificateTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2967",
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

  // customerName: {
  //   fontSize: 8,
  //   marginBottom: 2,
  // },

  customerTextGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  customerName: {
    fontSize: 8,
    fontWeight: "bold",
  },

  customerText: {
    fontSize: 8,
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },

  customerTextLabel: {
    fontWeight: "bold",
  },

  certificateHeader: {
    backgroundColor: "#1f2967",
    color: "#fff",
    padding: 8,
    fontSize: 11,
    fontWeight: "bold",
    // marginTop: 10,
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
    fontSize: 8,
  },

  amountSection: {
    margin: "15px auto",
    border: "2 solid #1f2967",
    padding: 10,
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  amountLabel: {
    fontSize: 8,
    color: "#555",
  },

  amountValue: {
    fontSize: 14,
    color: "#1f2967",
    fontWeight: "bold",
  },

  // amountWords: {
  //   marginTop: 4,
  //   fontSize: 8,
  //   color: "#666",
  // },

  termsSection: {
    // marginTop: 30,
  },

  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1f2967",
  },

  termText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  term: {
    fontSize: 8,
    color: "#444",
  },

  signatureSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  signatureBox: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },

  signature: {
    fontFamily: "Times-Italic",
    fontSize: 9,
  },

  signatureLine: {
    borderTop: "1 solid #444",
    width: "100%",
  },

  signatureText: {
    fontWeight: "bold",
    fontSize: 8,
  },

  footer: {
    borderTop: "1 solid #d1d5db",
    paddingTop: 6,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  footerText: {
    fontSize: 8,
    color: "#444",
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

  stamp: {
    width: 100,
    height: 100,
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
            <View style={styles.logoBox}>
              <View style={styles.logoBoxText}>
                <Text style={{ color: "#1f2967" }}>Deutsche Bank</Text>
                <Text style={{ color: "#2c82be" }}>Wealth Management</Text>
              </View>

              <Image src="/img/duetsche-slash.png" style={styles.logo} />
            </View>

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
            <View style={styles.customerTextGroup}>
              <Text style={styles.customerName}>
                {currentUser?.title} {currentUser?.firstName}{" "}
                {currentUser?.lastName}
              </Text>

              <View style={styles.customerText}>
                <Text>
                  {currentUser?.individualAccount?.houseNumberOrName ||
                    currentUser?.jointAccount?.houseNumberOrName ||
                    currentUser?.companyAccount?.houseNumberOrName}
                </Text>
              </View>

              <View style={styles.customerText}>
                <Text>
                  {currentUser?.individualAccount?.town ||
                    currentUser?.jointAccount?.town ||
                    currentUser?.companyAccount?.town}
                </Text>
              </View>

              <View style={styles.customerText}>
                <Text>
                  {currentUser?.individualAccount?.region ||
                    currentUser?.jointAccount?.region ||
                    currentUser?.companyAccount?.region}
                </Text>

                <Text style={{ marginLeft: 1 }}>
                  {currentUser?.individualAccount?.streetName ||
                    currentUser?.jointAccount?.streetName ||
                    currentUser?.companyAccount?.streetName}
                </Text>
              </View>

              <View style={styles.customerText}>
                <Text>
                  {currentUser?.individualAccount?.postcode ||
                    currentUser?.jointAccount?.postcode ||
                    currentUser?.companyAccount?.postcode}
                </Text>
              </View>
            </View>

            <View style={styles.customerTextGroup}>
              <View style={styles.customerText}>
                <Text style={styles.customerTextLabel}>Account Number:</Text>
                <Text>{currentUser?.referenceNumber}</Text>
              </View>

              <View style={styles.customerText}>
                <Text style={styles.customerTextLabel}>Bond ISIN:</Text>
                <Text>{bond.bondNumber}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.certificateHeader}>Bond Information</Text>
          </View>

          {/* Bond Details */}
          <View style={styles.certificateBox}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Bond ISIN</Text>
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
                {bond.profitPercentage}%
                {/* {bond.bondInvestmentOption === "Aviva" ? "6.125%" : "8.81%"} */}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Investment Amount</Text>
              <Text style={styles.tableCellValue}>
                £{Number(bond.investmentAmount).toLocaleString()}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Total Interest</Text>
              <Text style={styles.tableCellValue}>
                £{Number(bond.totalReturn).toLocaleString()}
              </Text>
            </View>

            <View style={[styles.tableRow, { borderBottom: 0 }]}>
              <Text style={styles.tableCellTitle}>Total Payable</Text>
              <Text
                style={[
                  styles.tableCellValue,
                  {
                    fontWeight: "bold",
                    color: "#1f2967",
                  },
                ]}
              >
                £{Number(bond.availableForWithdraw).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Highlight Amount */}
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Total Earned Value</Text>

            <Text style={styles.amountValue}>
              £{Number(bond.availableForWithdraw).toLocaleString()}
            </Text>

            {/* <Text style={styles.amountWords}>
              Certified By Investment Amount
            </Text> */}
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>

            <View style={styles.termText}>
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
          </View>

          {/* Signature */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <Text style={styles.signature}>Fabrizio Campelli</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Authorized Signatory</Text>
              <Image src="/img/stamp.jpeg" style={styles.stamp} />
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
              21 Moorfields, London, EC2Y 9DB
            </Text>

            <Text style={styles.footerText}>
              © {dayjs().format("YYYY")} Deutsche Bank Wealth. All Rights
              Reserved.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BondCertificate;

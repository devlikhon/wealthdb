import JsBarcode from "jsbarcode";

export const generateBarcode = (value: string): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");

    JsBarcode(canvas, value, {
      format: "CODE128",
      displayValue: false,
      width: 2,
      height: 40,
    });

    resolve(canvas.toDataURL("image/png"));
  });
};

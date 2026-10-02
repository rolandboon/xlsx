import { createFiles, createXlsx, Workbook, XlsxFile } from ".."

var workbook: Workbook = {
	formulas: false,
	styles: {
		bold: { font: { sz: 11, name: "Calibri", b: true }, alignment: { vertical: "center", wrapText: true } },
		border: { border: "thin" },
		fill: { fill: "FFFF00" },
	},
	sheets: [
		{
			name: "Products",
			mergeCells: ["A1:C1"],
			showGridLines: false,
			pageMargins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4, header: 0.2, footer: 0.2 },
			pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
			cols: [{ width: 20, bestFit: true, customWidth: true }, 0, "15"],
			freeze: { rows: 1, cols: 0 },
			data: [
				["Apple", 1.99, 10],
				["Banana", 0.99, null],
				{ hidden: true, data: ["hidden row"] },
				{ height: 25, data: [{ style: "bold", value: "Total" }, { format: "date", value: new Date() }] },
				null,
			]
		},
		null,
		[["A", "B", "C"]],
	]
}

var files: XlsxFile[] = createFiles(workbook)
files[0].name satisfies string
files[0].content satisfies string

// Promise form
createXlsx(workbook) satisfies Promise<Uint8Array>
createXlsx(workbook, { comment: "test" }) satisfies Promise<Uint8Array>

// Callback form
createXlsx(workbook, (err, data) => {
	data satisfies Uint8Array
})
createXlsx(workbook, {}, (err, data) => {
	data satisfies Uint8Array
})

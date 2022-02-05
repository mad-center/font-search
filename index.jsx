#include "src/recurse.jsx";
#include "src/file.jsx";

var projectName = app.project.file.name;

var activeItem = app.project.activeItem;
var activeItemName = activeItem.name
// alert(app.project.file.name); //sample.aep
// alert(activeItem.name) //main

var selectedCompItems = [activeItem]
var result = getChildItems(selectedCompItems)

var textLayers = result.textLayers;
// alert(textLayers.length); //2068

// font name format: ComicNenu-Light

// for loop all text layers and extract all font names(with variants) to a list.
var fontList = [];
for (var i = 0; i < textLayers.length; i++) {
    var textLayer = textLayers[i];
    var textLayerDocument = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
    var textLayerDocumentValue = textLayerDocument.value;
    fontList.push(textLayerDocumentValue.font)
}
var uniqueFontList = unique(fontList)
// alert(uniqueFontList.length) //27

// line-break fontList by comma
var fontListStr = "";
for (var i = 0; i < uniqueFontList.length; i++) {
    var font = uniqueFontList[i];
    fontListStr += font;
    if (i !== uniqueFontList.length - 1) {
        fontListStr += "," + "\r\n";
    }
}
// alert(fontListStr)

// write font list above to a local file
var path = "./" + projectName + "-" + activeItemName + "__fontReport.txt";
var feedback = writeReport(path, fontListStr)
if (feedback) {
    alert("Export font report successfully.")
}
// refer code: https://www.yuelili.com/ae-script-how-to-traverse-the-comp-synthesis-sub-layer-to/
// modified by wdpm
// use gists: https://gist.github.com/wdpm/ee386003a551bb352f6f1b06c59a68ce
function unique(arr) {
  var sortArr = arr.sort();
  var result = [sortArr[0]];
  var sortArrLen = sortArr.length;
  for (var i = 1; i < sortArrLen; i++) {
    sortArr[i] !== sortArr[i - 1] && result.push(sortArr[i]);
  }
  return result;
}

function getChildItems(selectedCompItems) {
  var result = {};
  var childCompItemsArr = [];
  var textLayersArr = [];

  function getChildCompItems(compItem) {
    var childLayersNum = compItem.layers.length;
    for (var i = 1; i <= childLayersNum; i++) {
      var currentLayer = compItem.layer(i);
      var currentLayerSource = currentLayer.source;
      if (currentLayerSource instanceof CompItem) {
        childCompItemsArr.push(currentLayerSource);
        // recurse this CompItem, finally this CompItem is an array
        getChildCompItems(currentLayerSource);
      } else {
        if (currentLayer.matchName == "ADBE Text Layer") {
          textLayersArr.push(currentLayer);
        }
      }
    }
  }

  var selectedCompsNum = selectedCompItems.length;
  for (var i = 0; i < selectedCompsNum; i++) {
    getChildCompItems(selectedCompItems[i]);
  }

  result.textLayers = textLayersArr;
  return result;
}

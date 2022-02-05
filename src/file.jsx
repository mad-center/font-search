function fileFS() {
    return File.fs;
}

function isExists(filePath) {
    var f = new File(filePath);
    return f.exists;
}

function writeReport(path, reportText) {
    var reportFile = new File(path); //path  + "/font_report.txt"
    if (reportFile.exists) {
        //alert('file already exists');
    }

    reportFile.open("w");  //'a' means append mode
    reportFile.write(reportText);
    reportFile.close();

    return true;
}
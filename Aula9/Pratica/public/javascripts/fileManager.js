$(function() {

})

function showImage(fname, ftype){
    $("#display").empty()
    
    if(ftype == "image/jpeg" || ftype == "image/png"){
        var ficheiro = $('<img src="/fileStore/' + fname + '" width=80%/>')
        var download = $('<div><a href="/download/' + fname + '">Download</a></div>')
        $("#display").append(ficheiro, download)
        $("#display").modal()
    } else if (ftype == "application/json"){
        $.get('/fileContents/' + fname, (response) => {
            var content = $('<pre>' + response + '</pre>')
            var download = $('<div><a href="/download/' + fname + '">Download</a></div>')
            $("#display").append(content, download)
            $("#display").modal()
        })
        .fail((error) => {
            console.log(ftype)
            console.log(fname)
        })
    } else if (ftype == "text/html"){
        $.get('/fileContents/' + fname, (response) => {
            var content = $(response)
            var download = $('<div><a href="/download/' + fname + '">Download</a></div>')
            $("#display").append(content, download)
            $("#display").modal()
        })
        .fail((error) => {
            console.log(ftype)
            console.log(fname)
        })
    } else {
        var ficheiro = $('<p>' + fname + '</p>')
        var download = $('<div><a href="/download/' + fname + '">Download</a></div>')
        $("#display").append(ficheiro, download)
        $("#display").modal()
    }
}
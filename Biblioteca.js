$(document).ready(function () {
    modificarNavegacionDS();
    getFoldersAndDocuments("Documentos", "normativa", "bibliotecadocNormativa", "Documentos");
   });


function getFoldersAndDocuments(nameList, idDiv, biblioteca, urlNameList) {
    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')/items?$select=DocIcon,FileLeafRef,FileSystemObjectType,EncodedAbsUrl,mostrarEnPortada&$expand=Folder&$filter=mostrarEnPortada%20eq%20%271%27%20&$top=9";
    let urlNewDoc = _spPageContextInfo.webAbsoluteUrl + "/" + urlNameList + '/Forms/AllItems.aspx';
    urlAllItems = urlNewDoc;
    let selectorSection = $("#" + idDiv);
    let htmlSection =
        '<div class="panel-separator"> </div>'
        + '<div class="container">'
        + '<div class="panel-separator"> </div>'
        + '<div class="text-mutted btnNew" style="display:none"><a class="btn btn-primary" style="color:#FFFFFF" href="' + urlNewDoc + '" role="button">Nuevo</a></div>'
        + '<div class="row mt-3"  id="' + biblioteca + '">'
        + '</div>'
        + '</div>';
    let htmlVerMas = '<div class="col-12 col-md-12 col-md-offset-3 text-center">'
        + '<a href="' + urlAllItems + '" class="btn btn-primary text-white">Ver todo </a>'
        + '</div>';
    $(selectorSection).before(htmlSection);
    $(selectorSection).after(htmlVerMas);

    $.ajax({
        url: url,
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            data = data.d.results;
            if (data.length > 0) {
                $.each(data, function (index, item) {
                    console.log(data);
                    let fileName = item.FileLeafRef;
                    let fileType = item.FileSystemObjectType;
                    let itemId = fileType === 0 ? "carpeta_" + index : "archivo_" + index;
                    let itemType = fileType === 0 ? 'fa-regular fa-file fa-lg' : 'fa-regular fa-folder-open fa-lg';
                    let iconStyle = fileType === 0 ? '' : 'color: #f6d125e3 !important;';
                    let typeFile = '<i class="' + itemType + '" id="tipoElemento" style="' + iconStyle + '"></i>' + " ";
                    let itemUrl = item.EncodedAbsUrl;
                    let container = $('<div class="col-12 col-sm-12 col-md-3" id="panelDocs">')
                        .css('display', 'flex')
                        .css('flex-direction', 'column')
                        .addClass('panel-default');
                    let titleFiles = $('<h3>').attr('id', itemId).text(fileName);

                    titleFiles.on("click", function () {
                        window.open(itemUrl, "_blank");
                    });

                    let panel = $('<div>').addClass('panel-body');
                    panel.append(titleFiles);
                    container.append(panel);
                    // $("#tipoElemento").append(typeFile);
                    $("#" + biblioteca).append(container);
                    $(titleFiles).prepend(typeFile);

                });
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

//Archivo de funciones útiles para el sitio

function modificarNavegacionDS() {

    let selectorNav = $("#sectionNavegacion");
    let urlNav = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('navDS')/items?$select=ID,Title,Vinculo,Icono,Posicion&$orderby=Posicion asc";
    let htmlSelector = "";
    let htmlUl = "";
    $.ajax({
        url: urlNav,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            data = data.d.results;
            htmlUl = '<ul class="nav nav-icons todasLasNav">'

                + '</ul>';
            selectorNav.append(htmlUl);


            $.each(data, function (index, value) {

                let selectorIconos = $(".todasLasNav");

                htmlSelector = '<li class="botonera">'
                    + '<a href="' + value.Vinculo + '"><i class="' + value.Icono + '"></i><span>' + value.Title + '</span></a>'
                    + '</li>';

                selectorIconos.append(htmlSelector);
            });
        },
        error: function (data) {
            console.log(data);
        }
    });
}


function getList(nameList, idDiv, filter) {
       let Url = "";
    let divContenedor = $("#" + idDiv);
    if (filter == "") {
        Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')/items?orderby=Title asc";
    }
    else {
        Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')/items?orderby=Title asc&$filter=" + filter;
    }

    console.log(Url);
    console.log(divContenedor);
    $.ajax({
        url: Url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            data = data.d.results;
            if (data.length > 0) {
                console.log(data);
                $.each(data, function (index, value) {
                    getDocumentID(divContenedor, nameList, value.ID, value.Title);

                });
            }
            else {
                divContenedor.append('<span class="text-mutted m-1">No existe documentación para esta vista.</span>');
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}


function getDocumentID(divContenedor, nameList, id) {
    let Url = "";
    let htmlInfo = "";
    Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')/items(" + id + ")/File";
    $.ajax({
        url: Url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            data = data.d;
            console.log(data);
            console.log(Url);
            var titulo = (data.Title != null || data.Title == "" ? data.Title : data.Name);
             htmlInfo += '<div class="col-12 col-sm-12 col-md-4">'
                + ' <a class="panel panel-default" href="' + data.ServerRelativeUrl + '" target="_blank">'
                + '  <div class="panel-body" >'
                // + '<i class="fa-regular fa-folder-open fa-lg" style="color: #f6d125e3 !important;"></i>'


                + '<h3> <i class="fa-regular fa-file fa-lg"></i>' + " " + titulo + '</h3>'
                + '  </div> '
                + ' </a>'
                + ' </div>';
            divContenedor.append(htmlInfo);
         
        },
        error: function (data) {
            console.log(data);
        }
    });
}



function getOnlyList(nameList, idDiv, filter, source, urlNameList, itemList) {
    console.log("nameList: " + nameList);
    let Url = "";
    let divContenedor = $("#" + idDiv);
    var URLItem = "";

    if (filter == "") {
        Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')/items?orderby=Title asc";
    }
    else {
        Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')/items?orderby=Title asc&$filter=" + filter;
    }
    $.ajax({
        url: Url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            data = data.d.results;
            if (data.length > 0) {
                $.each(data, function (index, value) {
                    URLItem = _spPageContextInfo.webAbsoluteUrl + "/Lists/" + urlNameList + "/DispForm.aspx?ID=" + value.ID + "&Source=" + source;
                    var htmlInfo = '<div class="col-12 col-sm-12 col-md-4">'
                        + ' <a class="panel panel-default" href="' + URLItem + '" target="_self">'
                        + '  <div class="panel-body">'
                        + '  <h3>' + value[itemList] + '</h3>'
                        + '  </div> '
                        + ' </a>'
                        + ' </div>'
                    divContenedor.append(htmlInfo);
                });
            }
            else {
                divContenedor.append('<span class="text-mutted m-1">No existe información para esta vista.</span>');
            }

        },
        error: function (data) {
            console.log(data);
        }
    });
}

function newFile(nameList, source, idDiv, tipo, urlNameList) {
    let urlNewDoc = "";
    let urlAllItems = "";
    switch (tipo) {
        case "Lista":
            urlNewDoc = _spPageContextInfo.webAbsoluteUrl + "/Lists/" + urlNameList + '/NewForm.aspx' + source;
            urlAllItems = _spPageContextInfo.webAbsoluteUrl + "/Lists/" + urlNameList + '/Allitems.aspx' + source;
            break;
        case "Biblioteca":
            urlNewDoc = _spPageContextInfo.webAbsoluteUrl + "/" + urlNameList + '/Forms/AllItems.aspx' + source;
            urlAllItems = urlNewDoc;
            break;
        default:
            urlNewDoc = _spPageContextInfo.webAbsoluteUrl + "/Lists/" + urlNameList + '/AllItems.aspx' + source;
            urlAllItems = _spPageContextInfo.webAbsoluteUrl + "/Lists/" + urlNameList + '/Allitems.aspx' + source;
            break;
    }
 
    let urlApi = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + nameList + "')";
    let divContenedor = $("#" + idDiv);
    let htmlSection =
        '<div class="panel-separator"> </div>'
        + '<div class="text-mutted btnNew" style="display:none"><a class="btn btn-primary" style="color:#FFFFFF" href="' + urlNewDoc + '" role="button" id= "hola">Nuevo</a></div>';
    let htmlVerMas = '<div class="col-12 col-md-12 col-md-offset-3 text-center">'
        + '<a href="' + urlAllItems + '" class="btn btn-primary text-white">Ver todo </a>'
        + '</div>';
    divContenedor.before(htmlSection);
    divContenedor.after(htmlVerMas);

    $.ajax({
        url: urlApi,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {

            data = data.d.results;


            $.each(data, function (index, value) {

                getCurrentUserInGroup(nameGroup);


            });
        },
        error: function (data) {
            console.log(data);
        }
    });
}


function getCurrentUserInGroup(nameGroup) {
    var userId;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            userId = data.d.Id;
            getCurrentUserGroup(userId, nameGroup);
        },
        error: function (data) {
            failure(data);
        }
    });
}

function getCurrentUserGroup(userId, nameGroup) {
    $.ajax
        ({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + userId + ")/Groups",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                data = data.d.results;
                console.log(data);

                console.log("USERID: " + userId);

                if (data.length > 0) {
                    $.each(data, function (index, value) {

                        console.log(value.Title);
                        if (value.Title == nameGroup) {
                            $(".btnNew").show();
                        }
                    });
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
}


function getBibliotecaDeDocumentos() {
    let urlBiblioteca = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('URLRELATIVA')/folders";
    console.log(urlBiblioteca);
    let selectorSection = $("#sectionAux");
    let selectorBiblioteca = $("#documentacionDeReferencia");
    let htmlBiblioteca = "";
    let htmlSection = '<div class="panel-separator"> </div>'
        + '<div class="container">'
        + '<div class="panel-separator"> </div>'
        + '<div class="row mt-3" id="biblioteca">'
        + '</div>'
        + '</div>';
    selectorSection.append(htmlSection);

    $.ajax({
        url: urlBiblioteca,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {

            data = data.d.results;
            $.each(data, function (index, value) {
                if (value.Name != "Forms") {

                    htmlBiblioteca = '<div class= "col-12 col-md-6">'
                        + '<a href=" ' + value.ServerRelativeUrl + ' " class="panel panel-default" target="_self">'
                        + '<div class="panel-body">'
                        + '<div class="media">'
                        + '<div class="media-left padding-20">'
                        + '<i class="icono-4x icono-arg-tramite text-primary  "></i>'
                        + '</div>'
                        + '<div class="media-body mt-3">'
                        + '<h3>' + value.Name + '</h3>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '</div>';
                    $("#biblioteca").append(htmlBiblioteca);
                }
            });
        },

        error: function (data) {
            console.log(data);
        }

    });
}


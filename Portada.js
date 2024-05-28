$(document).ready(function (){
    $("#sectionAreas").show();
    $("#sectionAreas .pane-content").hide();
    let urlNovedades =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Novedades')/items?$select=ID,Title,Cuerpo,Subtitulo,Foto&$filter=(Activo%20eq%20%27Sí%27)&$orderby=Orden%20asc";
    getNovedades(urlNovedades);
 $("#sectionAux").show();
     getResponsable("xx","Director");
     let UrlArea =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Organigrama')/items?$select=ID,Title,URL&$orderby=Orden%20asc";
     getAreas(UrlArea);
});


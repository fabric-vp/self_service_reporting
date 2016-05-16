thinkspaceConfig.controls.gallery.eventHandlers.click = function () {
    
    OnClickAddToGallery();
};

thinkspaceConfig.controls.save.eventHandlers.click = function () {

    OnClickSave();
};

function OnClickSave() {    
    var ngpPlatform = window.Logi;
    var thinkspaceTagId = Y.one('logi-thinkspace').get("id");
    var thinkspaceWidget = ngpPlatform.Platform.select("#" + thinkspaceTagId);
        
    var tsConfigHiddenInput = Y.one('#rdThinkspaceConfig');
    var rdDvdNameHiddenInput = Y.one('#rdDvdName');
    

    var tsConfig = thinkspaceWidget.config();           
    tsConfigHiddenInput.set('value', JSON.stringify(tsConfig));
    rdDvdNameHiddenInput.set('value', tsConfig.dataview);
        
    var saveButtonWrapperDiv = Y.one('#rdClassicSaveStateButton');

    if (saveButtonWrapperDiv) {
        var link = saveButtonWrapperDiv.one('#rdTsActionBookmark');
        var fnSaveText = link.getAttribute('onclick');
        eval(fnSaveText);
    }
}

function OnClickAddToGallery()
{
        
    CaptureVizConfigDataview();

    var buttonWrapper = Y.one('#rdClassicAddToDashboardButton');
    if (buttonWrapper) {
        var link = buttonWrapper.one('a');
        var fnText = link.getAttribute('onclick');
        eval(fnText);
    }    
}


function CaptureVizConfigDataview() {
    var ngpPlatform = window.Logi;
    
    var thinkspaceTagId = Y.one('logi-thinkspace').get("id");
    var vizConfigHiddenInput = Y.one('#rdNgpDataVizConfig');
    var vizDataviewHiddenInput = Y.one('#rdNgpDataViewName');
    var vizDataViewIdHiddenInput = Y.one('#rdDataViewId');
   
    var thinkspaceWidget = ngpPlatform.Platform.select("#" + thinkspaceTagId);
    var vizBuilder = thinkspaceWidget.getVizBuilder();
    var vizConfig = vizBuilder.getCurrentVisualizationConfig();
    vizConfig.style.width = "100%";
    vizConfig.style.height = "400px";

    //this can be removed after AS does clean up  NGP-2842
    delete vizConfig.parentContainer
    //if (!vizConfig.eventHandler) {
    //    vizConfig.eventHandler = {};
    //}


    vizConfigHiddenInput.set('value', JSON.stringify(vizConfig));

    var ads = ngpPlatform.Platform.appDataProvider();
    var vizDataview = ads.resolveDataView(vizConfig.dataview).model.plain();
    vizDataviewHiddenInput.set('value', JSON.stringify(vizDataview)); 
    vizDataview.starts[0].dataview
    vizDataViewIdHiddenInput.set('value', vizDataview.starts[0].dataview);
}

function onLogiReady() {
   Y.one('#thinkspacewait').hide();
}


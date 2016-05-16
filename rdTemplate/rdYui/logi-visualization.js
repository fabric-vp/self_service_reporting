YUI.add('rdLogiVisualization', function (Y) {
    //"use strict";

    var Lang = Y.Lang,
        TRIGGER = 'rdLogiVisualization';

    if (LogiXML.Ajax.AjaxTarget) {
        LogiXML.Ajax.AjaxTarget().on('reinitialize', function () { Y.LogiXML.rdLogiVisualization.createElements(true); });
    }

    Y.LogiXML.Node.destroyClassKeys.push(TRIGGER); 

    Y.namespace('LogiXML').rdLogiVisualization = Y.Base.create('rdLogiVisualization', Y.Base, [], {

        id: null,
        configNode: null,

        initializer: function (config) {
            this._parseHTMLConfig();
            this.configNode.setData(TRIGGER, this);
        },

        _parseHTMLConfig: function () {
            this.configNode = this.get('configNode');
            this.id = this.configNode.getAttribute('id');
        },

        destructor: function () {
            var configNode = this.configNode;
            var div = $('#' + this.id + ' div');
            if (div) {
                var divScope = div.children().scope();
                if (divScope) {
                    divScope.$destroy();
                }
            }
            configNode.setData(TRIGGER, null);
        }

    }, {
        // Static Methods and properties
        NAME: 'rdLogiVisualization',
        ATTRS: {
            configNode: {
                value: null,
                setter: Y.one
            }
        },

        createElements: function (isAjax) {

            var element;

            Y.all('.' + TRIGGER).each(function (node) {
                element = node.getData(TRIGGER);
                if (!element) {
                    element = new Y.LogiXML.rdLogiVisualization({
                        configNode: node
                    });
                }
                if (isAjax) {
                    Y.LogiXML.rdLogiVisualization.createVisualization(node);
                }
            });
        },
        
        createVisualization: function (configNode) {
            var vizElement = configNode.one('logi-visualization');
            if (!vizElement) {
                return;
            }
            var parentNode = vizElement.get('parentNode');
            var vizDataView = vizElement.getAttribute('dataview');
            var vizDataViewObject = window[vizDataView];
            var vizConfig = vizElement.getAttribute('config');
            var vizConfigObject = window[vizConfig];
            vizConfigObject.dataview = vizDataViewObject;
            vizElement.removeAttribute('dataview');
            vizElement.removeAttribute('config');
            var vizHtml = vizElement.get('outerHTML');
            vizElement.remove();

            var ngpPlatform = window.Logi;

            if (ngpPlatform && ngpPlatform.Platform) {
                var createdViz = ngpPlatform.Platform.select('#' + parentNode.getAttribute('id')).append(vizHtml, vizConfigObject);
            }
        },

        visualizationRendered: function (visId) {
            var divContainer = Y.one('#' + visId);
            if (divContainer) {
                if (divContainer.hasClass('rdBrowserBorn')) {
                    divContainer.setAttribute("data-rdBrowserBornReady", "true");
                } else {
                    var wrapperNode = divContainer.ancestor('.rdBrowserBorn');
                    if (wrapperNode) {
                        wrapperNode.setAttribute("data-rdBrowserBornReady", "true");
                    }
                }
            }
        }
    });

}, '1.0.0', { requires: ['base', 'node', 'event', 'node-custom-destroy', 'event-custom'] });


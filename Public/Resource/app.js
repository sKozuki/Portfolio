import resourceView from "./resourceView.js";
import resourceAPI from "./resourceAPI.js";

export default class App{
    constructor(root){
        this.resources = [];
        this.activeResource = null;
        this.view = new resourceView(root, this._handlesss());

        this._refreshResources();
    }

    _refreshResources(){
        const resources = resourceAPI.getAllResource();

        this._setResources(resources);

        if(resources.length > 0){
            this._setActiveResource(resources[0]);
        }
    }

    _setResources(resources){
        this.resources = resources;
        this.view.updateResourceList(resources);
        this.view.updateResourcePreviewVisibility(resources.length > 0);
    }

    _setActiveResource(resource){
        this.activeResource = resource;
        this.view.updateActiveResource(resource);
    }

    _handlers(){
        return{
            onResourceSelect: resourceId => {
                const selectedResource = this.resources.find(resource => resource.id == resourceId);
                this._setActiveResource(selectedResource);
            },
            onResourceAdd: () => {
                const newResource = {
                    title: "New Resource",
                    body: "Take note..."
                };

                resourceAPI.saveResource(newResource);
                this._refreshResources();
            },
            onResourceEdit: (title, body) => {
                resourceAPI.saveResource({
                    id: this.activeResource.id,
                    title,
                    body
                });

                this._refreshResources();
            },
            onResourceDelete: resourceId => {
                resourceAPI.deleteResource(resourceId);
                this._refreshResources();
            },
        };
    }
}
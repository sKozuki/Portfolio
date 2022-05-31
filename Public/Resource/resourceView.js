export default class resourceView{
    constructor(root, { onResourceSelect, onResourceAdd, onResourceEdit, onResourceDelete } = {}){
        this.root = root;
        this.onResourceSelect = onResourceSelect;
        this.onResourceAdd = onResourceAdd;
        this.onResourceEdit = onResourceEdit;
        this.onResourceDelete = onResourceDelete;
        this.root.innerHTML =  `
        <div class="resources__sidebar">
            <button class="resources__add" type="button">Add Resource</button>
            <div class="resources__list"></div>
        </div>
        <div class="resources__preview">
            <input class="resources__title" type="text" placeholder="Enter a title...">
            <textarea class="resources__body">I am the resource body...</textarea>
        </div>
        `;

        const btnAddResource = this.root.querySelector(".resources__add");
        const inpTitle = this.root.querySelector(".resources__title");
        const inpBody = this.root.querySelector(".resources__body");

        btnAddResource.addEventListener("click", () => {
            this.onResourceAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateResourcePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 60;

        return `
        <div class="resources__list-item" data-resource-id="${id}">
        <div class="resources__small-title">${title}</div>
        <div class="resources__small-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="resources__small-updated">
        ${updated.toLocaleString(undefined, {datestyle: "full", timestyle: "short"})}
        </div>
    </div>
        `;
    }

    updateResourceList(resources){
        const resourcesListContainer = this.root.querySelector(".resource__list");

        //Empty list
        resourcesListContainer.innerHTML = "";

        for (const resource of resources){
            const html = this._createListItemHTML(resource.id, resource.title, resource.body, new Date(resource,updated));

            resourcesListContainer.insertAdjacentHTML("beforeend", html);
        }

        //Add slect/delete events for each list item
        resourcesListContainer.querySelectorAll(".resources__list-item").forEach(resourceListItem => {
            resourcesListItem.addEventListener("click", () => {
                this.onResourceSelect(resourcesListItem.dataset.resourceId);
            });

            resourcesListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this resource?");

                if(doDelete){
                    this.onResourceDelete(resourcesListItem.dataset.resourceId);
                }
            });
        });
    }
    updateActiveResource(resource){
        this.root.querySelector(".resources__title").value = resource.title;
        this.root.querySelector(".resources__body").value = resource.body;

        this.root.querySelectorAll(".resources__list-item").forEach(resourceListItem => {
            resourceListItem.classList.remove("resources__list-item--selected");
        });

        this.root.querySelector(`.resources__list-item[data-resource-id="${resource.id}"]`).classList.add("resources__list-item--selected");
    }

    updateResourcePreviewVisibility(visible){
        this.root.querySelector(".resources__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
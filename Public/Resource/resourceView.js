export default class resourceView{
    constructor(root, { onResourceSelect, onResourceAdd, onResourceEdit, onResourceDelete } = {}){
        this.root = root;
        this.onResourceSelect = onResourceSelect;
        this.onResourceAdd = onResourceAdd;
        this.onResourceEdit = onResourceEdit;
        this.onResourceDelete = onResourceDelete;
        this.root.innerHTML =  `
        <div class="resource__sidebar">
            <button class="resource__add" type="button">Add Resource</button>
            <div class="resource__list"></div>
        </div>
        <div class="resource__preview">
            <input class="resource__title" type="text" placeholder="Enter a title...">
            <textarea class="resource__body">I am the resource body...</textarea>
        </div>
        `;

        const btnAddResource = this.root.querySelector(".resource__add");
        const inpTitle = this.root.querySelector(".resource__title");
        const inpBody = this.root.querySelector(".resource__body");

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
        <div class="resource__list-item" data-resource-id="${id}">
        <div class="resource__small-title">${title}</div>
        <div class="resource__small-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="resource__small-updated">
        ${updated.toLocaleString(undefined, {datestyle: "full", timestyle: "short"})}
        </div>
    </div>
        `;
    }

    updateResourceList(resources){
        const resourceListContainer = this.root.querySelector(".resource__list");

        //Empty list
        resourceListContainer.innerHTML = "";

        for (const resource of resources){
            const html = this._createListItemHTML(resource.id, resource.title, resource.body, new Date(resource,updated));

            resourceListContainer.insertAdjacentHTML("beforeend", html);
        }

        //Add slect/delete events for each list item
        resourceListContainer.querySelectorAll(".resource__list-item").forEach(resourceListItem => {
            resourceListItem.addEventListener("click", () => {
                this.onResourceSelect(resourceListItem.dataset.resourceId);
            });

            resourceListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this resource?");

                if(doDelete){
                    this.onResourceDelete(resourceListItem.dataset.noteId);
                }
            });
        });
    }
    updateActiveResource(resource){
        this.root.querySelector(".resource__title").value = resource.title;
        this.root.querySelector(".resource__body").value = resource.body;

        this.root.querySelectorAll(".resource__list-item").forEach(resourceListItem => {
            resourceListItem.classList.remove("resource__list-item--selected");
        });

        this.root.querySelector(`.resource__list-item[data-resource-id="${resource.id}"]`).classList.add("resource__list-item--selected");
    }

    updateResourcePreviewVisibility(visible){
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
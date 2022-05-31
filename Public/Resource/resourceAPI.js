export default class resourceAPI{
    static getAllResource(){
        const resource = JSON.parse(localStorage.getItem("resourceapp-resource") || "[]");

        return resource.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });

    }

    static saveResource(resourceToSave){
        const resource = resourceAPI.getAllResource();
        const existing = resource.find(resource => resource.id == resourceToSave.id);

        // Edit/Update
        if(existing){
            existing.title = resourceToSave.title;
            existing.body = resourceToSave.body;
            existing.updated = new Date().toISOString();
        }else{
            resourceToSave.id = Math.floor(Math.random() * 1000000);
            resourceToSave.updated = new Date().toISOString();
            resource.push(resourceToSave);
        }


        resourceToSave.id = Math.floor(Math.random() * 100000);
        resourceToSave.updated = new Date().toISOString();
        resource.push(resourceToSave);

        localStorage.setItem("resourceapp-resource", JSON.stringify(resource));

    }

    static deleteResource(id){
        const resource = resourceAPI.getAllResource();
        const newResource = resource.filter(resource => resource.id != id);

        localStorage.setItem("resourceapp-resource",JSON.stringify(newNotes));

    }
}
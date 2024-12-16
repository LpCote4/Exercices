const fsPromises = require('fs').promises;
const path = require('path');


class CourseManager {
    constructor() {
        this.courses = [];
        this.path = path.join(__dirname + "../data/courses.json");
    }

    async readCoursesFromFile() {
        try {
            const courses = await fsPromises.readFile(this.path);
            this.courses = JSON.parse(courses);
        }
        catch(e) {
            console.log(`Aucun fichier trouvé. Chargement d'une liste vide`);
            this.courses = [];
        }
        finally {
            return this.courses;
        }
    }
}
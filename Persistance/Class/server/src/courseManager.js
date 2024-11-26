const fsPromises = require('fs').promises;
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_CONSTS = require("./env");

class CourseManager {
    constructor() {
        // this.courses = [];
        // this.path = path.join(__dirname + "../../data/courses.json");
        this.collection = null;
        this.client = null;
        this.options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        };
    }

    async init() {
        try {
            this.client = await MongoClient.connect(DB_CONSTS.DB_URL, this.options);
            this.collection = this.client.db(DB_CONSTS.DB_DB).collection(DB_CONSTS.DB_COLLECTION);
            this.collection.createIndex("sigle", { unique: true });
            console.log("Connexion à la base de données réussie");
            // const courses = await fsPromises.readFile(this.path);
            // this.courses = JSON.parse(courses);
        }
        catch (e) {
            console.error(e);
            // console.log(`Aucun fichier trouvé. Chargement d'une liste vide`);
            // this.courses = [];
        }
        // finally {
        //     return this.courses;
        // }
    }

    async getAllCourses() {
        return this.collection.find({}, { projection: { _id: 0 } }).toArray();
    }

    findCourse(sigle) { 
        return this.collection.findOne({ sigle }, { projection: { _id: 0 } });
        // return this.courses.find((c) => {
        //     return c.sigle === sigle;
        // });
    }

    async addCourse(sigle) {
        const course = { sigle, credits: Math.floor(Math.random() * 5 + 1) };
        try {
            await this.collection.insertOne(course);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
        // if (this.courses.find(x => x.sigle === course.sigle)) {
        //     return false;
        // }
        // this.courses.push(course);
        // await this.saveCoursesToFile();
        // return true;
    }

    async deleteCourse(sigle) {
        const deleteResult = await this.collection.deleteMany({ sigle });
        return deleteResult.deletedCount;
        // const size = this.courses.length;
        // this.courses = this.courses.filter((c) => c.sigle !== sigle);
        // await this.saveCoursesToFile();
        // return size > this.courses.length;
    }

    async modifyCourse(modifiedCourse) {
        const modifiedResult = await this.collection.updateOne(
            { sigle: modifiedCourse.sigle },
            { $set: { credits: modifiedCourse.credits } });
        return modifiedResult.matchedCount;
        // const course = this.courses.find((c) => {
        //     return c.sigle === modifiedCourse.sigle;
        // });
        // if (!course) return false;
        // course.credits = modifiedCourse.credits;
        // await this.saveCoursesToFile();
        // return true;
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany({});
            return true;
        }
        catch (e) {
            console.log('Erreur de suppression');
            return false;
        }
        // try {
        //     await fsPromises.unlink(this.path);
        //     this.courses = [];
        //     return true;
        // }
        // catch (e) {
        //     console.log('Erreur de suppression');
        //     return false;
        // }
    }

}

module.exports = CourseManager;
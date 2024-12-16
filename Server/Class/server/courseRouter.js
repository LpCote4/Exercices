const router = require("express").Router();
const CourseManager = require('./courseManager');
const courseManager = new CourseManager();

const urlencodedParser = require('express').urlencoded({ extended: false });


courseManager.readCoursesFromFile().then(() => {
    app.get("/cours/obtenirCours", function (req, res) {
        res.status(courses.length ? 200 : 404).send(courses);
    });
    
    app.get("/cours/obtenirCours/:sigle", function (req, res) {
        const course = courses.find((c) => {
            return c.sigle === req.params.sigle;
        });
        if (!course) {
            res.status(404).send({ error: "Cours non trouvé" });
            return;
        }
        res.send(course);
    });
    
    app.post("/cours/ajouterCours", urlencodedParser, function (req, res) {
        if (!req.body) return res.sendStatus(400);
        const course = { sigle: req.body.sigle, credits: Math.floor(Math.random() * 5 + 1) };
        if (courses.find(x => x.sigle === course.sigle)) {
            res.status(409).send({ error: `Cours ${course.sigle} déjà existant` });
            return;
        }
        courses.push(course);
        res.status(201).send(course.sigle + " a été ajouté");
    });
    
    app.delete("/cours/supprimerCours/:sigle", function (req, res) {
        const size = courses.length;
        courses = courses.filter((c) => c.sigle !== req.params.sigle);
        if (size > courses.length) res.send("Cours supprimé.");
        else res.status(400).send("Echec de suppression : cours introuvable dans la liste");
    });
    
    app.delete("/cours/supprimerTout", function (req, res) {
        courses = [];
        res.status(204).send();
    });
    
    app.patch("/cours/modifierCours/", urlencodedParser, function (req, res) {
        const course = courses.find((c) => {
            return c.sigle === req.body.sigle;
        });
        if (!course) return res.status(404).send("Ce cours n'existe pas");
        course.credits = req.body.credits;
        res.send("Cours modifié");
    });
});

module.exports = { router };
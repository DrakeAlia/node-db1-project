const express = require("express");

const knex = require("../data/dbConfig");

const router = express.Router();

// getting all accounts 
router.get("/", (req, res) => {
    knex
    .select()
    .from("accounts")
    .then(account => {
        res.json(account)
    })
    .catch(err => {
        res.status(500).json({ message: "error", err })
    });
});
// getting account by  id
router.get("/:id", (req, res) => {
    knex
    ('accounts')
    .where({id:req.params.id})
    .first()
    .then(post => {
        if(post){
            res.status(200).json({ data: post })
        } else {
            res.status(400).json({ message: "Post not found" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Error" })
    });
});
// posting a account
router.post("/", (req, res) => {
    const postData = req.body;
    knex("accounts")
    .insert(postData)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({ message: "cannot create" });
    });
});
// updating a account id
router.put("/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body

    knex("accounts")
    .where({id})
    .update(changes)
    .then(count => {
        if(count){
            res.json({ updated: count });
        } else {
            res.status(200).json(count);
        }
    })
    .catch(err => {
        res.status(500).json({ message: "cannot update "});
    });
});
// deleting a account id
router.delete("/:id", (req, res) => {
    const { id } = req.params
    knex("accounts")
    .where ({id})
    .del({id})
    .then(deleted => {
        res.status(200).json(deleted);
    })
    .catch(err => {
            res.status(500).json({ message: "cannot delete" });
        });
});


module.exports = router;
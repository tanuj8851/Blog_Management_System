const express = require("express");
const router = express.Router()
const Blog = require("../models/Blog");
const authenticateToken = require("../middleware/authenticate");

router.get("/blogs", authenticateToken, async (req, res) => {
    try {
        
        const blogs = await Blog.find({});
        res.status(200).json(blogs);

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

router.get("/blogs", authenticateToken, async (req, res) => {
    try {
        const { title } = req.query;
       
       
        const blogs = await Blog.find({ title });
        res.status(200).send(blogs);
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

router.get("/blogs", authenticateToken, async (req, res) => {
    try {
        const { category } = req.query;
        const blogs = await Blog.find({ category, author: req.user.userID })
        res.status(200).send(blogs)

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

router.get("/blogs", authenticateToken, async (req, res) => {
    try {
        const { sort, order } = req.query;
        const sortedOrder = order === "asc" ? 1 : -1;
        const blogs = await Blog.find({ author: req.user.userId }).sort({ date: sortOrder })
        res.status(200).send(blogs);

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

// create a blog
router.post("/blogs", authenticateToken, async (req, res) => {
    try {
        const { title, content, category } = req.body;
        // console.log(req.user._id);
        // console.log(req.user.username);
        const blog = new Blog({
            title, content, category, username: req.user.username
        })
        // console.log(blog)
        await blog.save()
        res.status(201).send({ msg: "Blog Created successfully" });


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

// Update a blog by ID
router.put("/blogs/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, category },
            { new: true }
        )

        if (!updatedBlog) {
            return res.status(404).send({ error: "Blog Not FOund" })
        }

        res.status(200).json({ msg: "Blog Updated Successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

// Delete blog by id
router.delete("/blogs/:id",authenticateToken, async (req, res) => {
    try {

        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).send("Blog not Found")
        }
        res.status(200).send({ msg: "Blog Deleted Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

// Like a blog by Id
router.patch("/blogs/:id/like",authenticateToken, async (req, res) => {
    try {
        // console.log(req.user)
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({ error: "Blog Not FOund" })
        }

        if (blog.likes.includes(req.user.userId)) {
            return res.status(400).send({ error: "You have already liked this blog" })
        }
        blog.likes.push(req.user._id);
        await blog.save()

        res.status(200).send({ msg: "Blog Liked" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

router.patch("/blogs/:id/comment",authenticateToken, async (req, res) => {
    try {

        const { id } = req.params;
        const { text } = req.body;

        const comment = {
            user: req.user._id,
            text
        };

        const updatedBlog = await Blog.findByIdAndUpdate(
            id, { $push: { comments: comment } },
            { new: true }

        )

        if (!updatedBlog) {
            return res.status(404).send({ error: "Blog Not Found" })
        }

       res.status(200).send({msg:"Comment Done",updatedBlog});
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Blogs error" })
    }
})

module.exports = router;
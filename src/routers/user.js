const express = require('express');
const router = new express.Router();
const multer = require('multer');
const User = require('../models/users');
const auth = require('../middleware/auth');
const {sendWelcomeEmail, sendCancellationEmail} = require('../emails/account');

const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload a Word document')) }
                cb(undefined, true)
            }
})


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/me/avatar', upload.single('avatar'), auth, async (req, res) =>{
    
        const user = req.user
        user.avatar = req.file.buffer;
        await user.save()
        res.send(user.avatar)
  
}, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
})

router.post('/users/login', async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    }
    catch(e){
        res.status(400).send({error:'Unable to login'})
    }
    
})


router.post('/users/logout', auth, async (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token;
        })

        await req.user.save();

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) =>{
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})


router.get('/users/me/avatar/:id', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send()
    }
    
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = req.user;

        updates.forEach((update) =>{
            user[update] = req.body[update]
        })

        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(user)
    } catch (e) {
        res.status(400).send(e) 
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = req.user;
        await user.remove()
        sendCancellationEmail(user.email, user.name)
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
const express = require('express');
const router = express.Router();

const Task = require('../models/task');


router.get('/', async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks);
    // renderiza vistas de views/index.ejs
    res.render('index',{
        tasks // exactly the same tasks: tasks
    });
});

router.post('/add', async (req,res)=>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});
// tareas relalizadas update
router.get('/done/:id', async (req,res)=>{
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

//editar

router.get('/edit/:id',async (req,res)=>{
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit',{
        task
    });

});

//update
router.post('/edit/:id', async (req,res)=>{
    const { id } = req.params;
    await Task.update({_id:id},req.body);
    res.redirect('/');
});

//eliminar
router.get('/delete/:id', async (req,res)=>{
    const { id } = req.params;
    await Task.remove({_id:id});
    res.redirect('/');
});

module.exports = router;
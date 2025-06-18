const express = require('express');
const router = express.Router();
const { addStudent, updateStudent,getAllStudents,deleteStudent } = require('../controllers/AdminController');
const {confirmFee }=require('../controllers/StudentController')

router.post('/', addStudent);

router.put('/:id', updateStudent);

router.get('/', getAllStudents);

router.delete('/:id', deleteStudent);

router.get('/confirm', confirmFee);

module.exports = router;

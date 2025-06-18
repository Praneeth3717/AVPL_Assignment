const Student = require('../models/Student');
const sendFeeEmail = require('../utils/sendFeeMail');

exports.addStudent = async (req, res) => {
  try {
    const { name, email, totalFee,feePaid, dueAmount, dueDate ,status} = req.body;

    const student = new Student({
      name,
      email,
      totalFee,
      feePaid,
      dueAmount,
      dueDate,
      status
    });

    await student.save();
    await sendFeeEmail(student);

    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error adding student', details: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await sendFeeEmail(updatedStudent);

    res.json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error updating student', details: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting student' });
  }
};

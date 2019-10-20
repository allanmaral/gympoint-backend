import * as Yup from 'yup';
import Student from '../models/Student';

class StudentsController {
  static async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Body validation failed.' });
    }

    const studentExists = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'email in use by another student' });
    }

    const { id, name, email, age, height, weight } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }

  static async update(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      height: Yup.number(),
      weight: Yup.number(),
      age: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Body validation failed' });
    }

    const { studentId, email } = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    if (email && email !== student.email) {
      const studentExists = await Student.findOne({ where: { email: student.email } });
      if (studentExists) {
        return res.status(400).json({ error: 'E-mail already in use.' });
      }
    }

    const { id, name, height, weight, age } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default StudentsController;

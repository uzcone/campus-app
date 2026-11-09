const express = require('express');
const router = express.Router();

let courses = [
  { id: 1, title: '웹프로그래밍', professor: '김교수', room: '공학관 301호', credits: 3, semester: '2026-1' },
  { id: 2, title: '자료구조', professor: '이교수', room: 'IT관 102호', credits: 3, semester: '2026-1' }
];

router.get('/', (req, res) => {
  const { semester } = req.query;
  if (semester) return res.json(courses.filter(c => c.semester === semester));
  res.json(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: '해당 과목 정보를 찾을 수 없습니다.' });
  res.json(course);
});

router.post('/', (req, res) => {
  const { title, professor, room, credits, semester } = req.body;
  if (!title || !credits || !semester) {
    return res.status(400).json({ error: '필수 항목(과목명, 학점, 학기)이 누락되었습니다.' });
  }
  const newCourse = {
    id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
    title, professor: professor || '미정', room: room || '미정',
    credits: Number(credits), semester
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: '해당 과목 정보를 찾을 수 없습니다.' });
  courses[index] = { ...courses[index], ...req.body, id };
  res.json(courses[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  courses = courses.filter(c => c.id !== id);
  res.json({ message: '과목이 정상적으로 삭제되었습니다.', deletedId: id });
});

module.exports = router;

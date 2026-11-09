const express = require('express');
const router = express.Router();

let assignments = [
  { id: 1, courseTitle: '웹프로그래밍', title: 'REST API 설계서 제출', dueDate: '2026-11-20', isCompleted: false },
  { id: 2, courseTitle: '자료구조', title: '이진 탐색 트리 구현 과제', dueDate: '2026-11-15', isCompleted: true }
];

router.get('/', (req, res) => res.json(assignments));

router.get('/:id', (req, res) => {
  const item = assignments.find(a => a.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: '해당 과제 정보를 찾을 수 없습니다.' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { courseTitle, title, dueDate } = req.body;
  if (!courseTitle || !title || !dueDate) {
    return res.status(400).json({ error: '과목명, 과제명, 마감일은 필수 입력 항목입니다.' });
  }
  const newAssignment = {
    id: assignments.length > 0 ? assignments[assignments.length - 1].id + 1 : 1,
    courseTitle, title, dueDate, isCompleted: req.body.isCompleted || false
  };
  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = assignments.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: '해당 과제 정보를 찾을 수 없습니다.' });
  assignments[index] = { ...assignments[index], ...req.body, id };
  res.json(assignments[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  assignments = assignments.filter(a => a.id !== id);
  res.json({ message: '과제가 정상적으로 삭제되었습니다.', deletedId: id });
});

module.exports = router;

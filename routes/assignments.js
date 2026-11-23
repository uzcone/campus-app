const express = require('express');
const { Assignment } = require('../models');

const router = express.Router();

// 1. 전체 과제 목록 조회
router.get('/', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll();
    res.json(assignments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 2. 단일 과제 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Assignment.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
    res.json(item);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 3. 새 과제 등록
router.post('/', async (req, res, next) => {
  try {
    const { courseTitle, title, dueDate, isCompleted, userId } = req.body;
    const newAssignment = await Assignment.create({
      courseTitle,
      title,
      dueDate,
      isCompleted: isCompleted || false,
      userId: req.user ? req.user.id : (userId || null),
    });
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 4. 과제 수정
router.put('/:id', async (req, res, next) => {
  try {
    const item = await Assignment.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 5. 과제 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await Assignment.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: '삭제할 과제를 찾을 수 없습니다.' });
    res.json({ message: '과제가 삭제되었습니다.', deletedId: id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
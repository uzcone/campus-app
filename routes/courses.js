const express = require('express');
const { Course } = require('../models');

const router = express.Router();

// 1. 전체 과목 조회 (학기 필터링 지원: GET /courses?semester=2026-2)
router.get('/', async (req, res, next) => {
  try {
    const { semester } = req.query;
    const where = semester ? { semester } : {};
    const courses = await Course.findAll({ where });
    res.json(courses);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 2. 단일 과목 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: '과목을 찾을 수 없습니다.' });
    res.json(course);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 3. 새 과목 등록
router.post('/', async (req, res, next) => {
  try {
    const { title, professor, room, credits, semester, userId } = req.body;
    const newCourse = await Course.create({
      title,
      professor: professor || '미정',
      room: room || '미정',
      credits: Number(credits) || 3,
      semester: semester || '2026-2',
      userId: req.user ? req.user.id : (userId || null),
    });
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 4. 과목 정보 수정
router.put('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: '과목을 찾을 수 없습니다.' });

    await course.update(req.body);
    res.json(course);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 5. 과목 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await Course.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: '삭제할 과목을 찾을 수 없습니다.' });
    res.json({ message: '과목이 삭제되었습니다.', deletedId: id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
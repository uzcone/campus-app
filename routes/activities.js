const express = require('express');
const { Activity } = require('../models');

const router = express.Router();

// 1. 전체 활동 목록 조회
router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 2. 단일 활동 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Activity.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '활동 내역을 찾을 수 없습니다.' });
    res.json(item);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 3. 새 활동 등록
router.post('/', async (req, res, next) => {
  try {
    const { name, role, period, description, userId } = req.body;
    const newActivity = await Activity.create({
      name,
      role,
      period: period || '진행 중',
      description: description || '',
      userId: req.user ? req.user.id : (userId || null),
    });
    res.status(201).json(newActivity);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 4. 활동 내역 수정
router.put('/:id', async (req, res, next) => {
  try {
    const item = await Activity.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '활동 내역을 찾을 수 없습니다.' });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 5. 활동 내역 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await Activity.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: '삭제할 활동 내역을 찾을 수 없습니다.' });
    res.json({ message: '활동 내역이 삭제되었습니다.', deletedId: id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
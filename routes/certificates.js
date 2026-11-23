const express = require('express');
const { Certificate } = require('../models');

const router = express.Router();

// 1. 전체 자격증 조회
router.get('/', async (req, res, next) => {
  try {
    const certificates = await Certificate.findAll();
    res.json(certificates);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 2. 단일 자격증 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Certificate.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '자격증 정보를 찾을 수 없습니다.' });
    res.json(item);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 3. 새 자격증 등록
router.post('/', async (req, res, next) => {
  try {
    const { title, issuer, score, issueDate, userId } = req.body;
    const newCert = await Certificate.create({
      title,
      issuer,
      score,
      issueDate: issueDate || new Date().toISOString().split('T')[0],
      userId: req.user ? req.user.id : (userId || null),
    });
    res.status(201).json(newCert);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 4. 자격증 정보 수정
router.put('/:id', async (req, res, next) => {
  try {
    const item = await Certificate.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '자격증 정보를 찾을 수 없습니다.' });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 5. 자격증 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await Certificate.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: '삭제할 자격증 정보를 찾을 수 없습니다.' });
    res.json({ message: '자격증이 삭제되었습니다.', deletedId: id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
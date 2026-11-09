const express = require('express');
const router = express.Router();

let activities = [
  { id: 1, name: '멋쟁이사자처럼 대학', role: '백엔드 개발자', period: '2026.03 ~ 2026.11', description: 'Node.js 스터디 및 해커톤 참여' }
];

router.get('/', (req, res) => res.json(activities));

router.get('/:id', (req, res) => {
  const item = activities.find(act => act.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: '해당 활동 정보를 찾을 수 없습니다.' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { name, role, period, description } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: '활동명과 역할은 필수 입력 항목입니다.' });
  }
  const newActivity = {
    id: activities.length > 0 ? activities[activities.length - 1].id + 1 : 1,
    name, role, period: period || '진행 중', description: description || ''
  };
  activities.push(newActivity);
  res.status(201).json(newActivity);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = activities.findIndex(act => act.id === id);
  if (index === -1) return res.status(404).json({ error: '해당 활동 정보를 찾을 수 없습니다.' });
  activities[index] = { ...activities[index], ...req.body, id };
  res.json(activities[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  activities = activities.filter(act => act.id !== id);
  res.json({ message: '활동 내역이 정상적으로 삭제되었습니다.', deletedId: id });
});

module.exports = router;


const express = require('express');
const router = express.Router();

let certificates = [
  { id: 1, title: '정보처리기사', issuer: '한국산업인력공단', score: '최종 합격', issueDate: '2026-06-15' },
  { id: 2, title: 'SQLD', issuer: '한국데이터산업진흥원', score: '합격', issueDate: '2026-09-10' }
];

// 1. 전체 자격증 조회
router.get('/', (req, res) => {
  res.json(certificates);
});

// 2. 단일 자격증 상세 조회
router.get('/:id', (req, res) => {
  const item = certificates.find(cert => cert.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: '해당 자격증 정보를 찾을 수 없습니다.' });
  res.json(item);
});

// 3. 신규 자격증 등록
router.post('/', (req, res) => {
  const { title, issuer, score, issueDate } = req.body;
  if (!title || !issuer || !score) {
    return res.status(400).json({ error: '자격증명, 발급기관, 취득점수(급수)는 필수 항목입니다.' });
  }

  const newCert = {
    id: certificates.length > 0 ? certificates[certificates.length - 1].id + 1 : 1,
    title,
    issuer,
    score,
    issueDate: issueDate || new Date().toISOString().split('T')[0]
  };
  certificates.push(newCert);
  res.status(201).json(newCert);
});

// 4. 자격증 정보 수정
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = certificates.findIndex(cert => cert.id === id);
  if (index === -1) return res.status(404).json({ error: '해당 자격증 정보를 찾을 수 없습니다.' });

  certificates[index] = { ...certificates[index], ...req.body, id };
  res.json(certificates[index]);
});

// 5. 자격증 내역 삭제
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = certificates.some(cert => cert.id === id);
  if (!exists) return res.status(404).json({ error: '해당 자격증 정보를 찾을 수 없습니다.' });

  certificates = certificates.filter(cert => cert.id !== id);
  res.json({ message: '자격증 내역이 정상적으로 삭제되었습니다.', deletedId: id });
});

module.exports = router;

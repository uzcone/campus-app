const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
// Render bergan portni olish, bo'lmasa 3000
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 정적 파일(Frontend) 제공
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 등록
app.use('/courses', require('./routes/courses'));
app.use('/assignments', require('./routes/assignments'));
app.use('/activities', require('./routes/activities'));
app.use('/certificates', require('./routes/certificates'));

// 메인 페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

app.listen(PORT, () => {
  console.log(`서버가 성공적으로 실행되었습니다: port ${PORT}`);
});

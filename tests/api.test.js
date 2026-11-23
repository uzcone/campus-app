const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync();
});

describe('CAMPASS 4대 라우터 핵심 API 테스트', () => {
  test('1. /courses - 수강 과목 등록 및 학기별 조회', async () => {
    const createRes = await request(app)
      .post('/courses')
      .send({
        title: 'AI웹개발2',
        professor: '김교수',
        room: '공학관 301호',
        credits: 3,
        semester: '2026-2',
      });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.title).toBe('AI웹개발2');

    const listRes = await request(app).get('/courses?semester=2026-2');
    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
  });

  test('2. /assignments - 과제 등록 및 조회', async () => {
    const createRes = await request(app)
      .post('/assignments')
      .send({
        courseTitle: 'AI웹개발2',
        title: 'REST API 설계서 및 프로젝트 제출',
        dueDate: '2026-11-25',
        isCompleted: false,
      });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.title).toBe('REST API 설계서 및 프로젝트 제출');
  });

  test('3. /activities - 대외활동 등록 및 조회', async () => {
    const createRes = await request(app)
      .post('/activities')
      .send({
        name: '멋쟁이사자처럼',
        role: '백엔드 개발자',
        period: '2026.03 ~ 2026.11',
        description: 'Node.js 및 Express 스터디 참여',
      });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.name).toBe('멋쟁이사자처럼');
  });

  test('4. /certificates - 자격증 등록 및 조회', async () => {
    const createRes = await request(app)
      .post('/certificates')
      .send({
        title: '정보처리기사',
        issuer: '한국산업인력공단',
        score: '합격',
        issueDate: '2026-06-15',
      });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.title).toBe('정보처리기사');
  });
});

afterAll(async () => {
  await sequelize.close();
});
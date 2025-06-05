const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
  let createdTaskId;

  test('POST /tasks - create task', async () => {
    const response = await request(app).post('/tasks').send({
      title: 'Test Task',
      priority: 'High',
      tags: ['test'],
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Task');
    createdTaskId = response.body._id || response.body.id;
  });

  test('GET /tasks - fetch tasks', async () => {
    const response = await request(app).get('/tasks');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('PUT /tasks/:id - update task', async () => {
    console.log({createdTaskId})
    const response = await request(app).put(`/tasks/${createdTaskId}`).send({
      title: 'Updated Task Title',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Task Title');
  });

  test('DELETE /tasks/:id - delete task', async () => {
    console.log({createdTaskId})

    const response = await request(app).delete(`/tasks/${createdTaskId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted');
  });

  test('POST /tasks - invalid input returns 400', async () => {
    const response = await request(app).post('/tasks').send({
      title: '',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0]).toHaveProperty('msg', 'Title is required');
  });
});


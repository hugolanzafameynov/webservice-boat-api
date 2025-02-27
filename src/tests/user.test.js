// tests/user.test.js
const request = require('supertest');
const app = require('../../app');

describe('Endpoints Utilisateurs', () => {
  let userId;

  it('Devrait créer un nouvel utilisateur (POST /api/users)', async () => {
    const newUser = {
      name: 'Dupont',
      firstName: 'Jean',
      birthDate: '1990-05-15',
      email: 'jean.dupont@example.com',
      status: 'individual'
    };

    const res = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('Devrait récupérer la liste des utilisateurs (GET /api/users)', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Devrait récupérer un utilisateur par son id (GET /api/users/:id)', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('Devrait mettre à jour un utilisateur (PUT /api/users/:id)', async () => {
    const updatedUser = {
      name: 'Dupont',
      firstName: 'Jean',
      birthDate: '1990-05-15',
      email: 'jean.dupont_modif@example.com',
      status: 'individual'
    };

    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual(updatedUser.email);
  });

  it('Devrait supprimer un utilisateur (DELETE /api/users/:id)', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });
});

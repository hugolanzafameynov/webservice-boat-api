// tests/boat.test.js
const request = require('supertest');
const app = require('../../app');
const Boat = require('../models/boat');

// Nous utilisons des hooks Jest pour préparer et nettoyer la DB
beforeAll(async () => {
  // Par exemple : await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Par exemple : await sequelize.close();
});

describe('Endpoints Bateaux', () => {
  let boatId;

  it('Devrait créer un nouveau bateau (POST /api/boats)', async () => {
    const newBoat = {
      name: 'Bateau Test',
      licenseType: 'coastal',
      boatType: 'open',
      maxCapacity: 10,
      dockingPort: 'Port de Test',
      engineType: 'diesel',
    };

    const res = await request(app)
      .post('/api/boats')
      .send(newBoat);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    boatId = res.body.id;
  });

  it('Devrait récupérer la liste des bateaux (GET /api/boats)', async () => {
    const res = await request(app).get('/api/boats');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Devrait récupérer un bateau par son id (GET /api/boats/:id)', async () => {
    const res = await request(app).get(`/api/boats/${boatId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', boatId);
  });

  it('Devrait mettre à jour un bateau (PUT /api/boats/:id)', async () => {
    const updatedBoat = {
      name: 'Bateau Test modifié',
      licenseType: 'coastal',
      boatType: 'open',
      maxCapacity: 12,
      dockingPort: 'Port modifié',
      engineType: 'diesel',
    };

    const res = await request(app)
      .put(`/api/boats/${boatId}`)
      .send(updatedBoat);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedBoat.name);
  });

  it('Devrait supprimer un bateau (DELETE /api/boats/:id)', async () => {
    const res = await request(app).delete(`/api/boats/${boatId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('Devrait renvoyer 404 si le bateau n’existe pas (GET /api/boats/:id)', async () => {
    const res = await request(app).get(`/api/boats/${boatId}`);
    expect(res.statusCode).toEqual(404);
  });
});

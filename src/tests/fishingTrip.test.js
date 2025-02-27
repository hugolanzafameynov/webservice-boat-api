// tests/fishingTrip.test.js
const request = require('supertest');
const app = require('../../app');

describe('Endpoints Sorties pêche', () => {
  let fishingTripId;

  it('Devrait créer une sortie pêche (POST /api/fishing-trips)', async () => {
    const newTrip = {
      title: 'Sortie pêche test',
      tripType: 'daily',
      pricingType: 'global',
      startDate: ['2025-01-20'],
      endDate: ['2025-01-20'],
      price: 100.0,
      userId: '123',
      boatId: '456',
    };

    const res = await request(app)
      .post('/api/fishing-trips')
      .send(newTrip);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    fishingTripId = res.body.id;
  });

  it('Devrait récupérer la liste des sorties pêche (GET /api/fishing-trips)', async () => {
    const res = await request(app).get('/api/fishing-trips');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Devrait récupérer une sortie pêche par son id (GET /api/fishing-trips/:id)', async () => {
    const res = await request(app).get(`/api/fishing-trips/${fishingTripId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', fishingTripId);
  });

  it('Devrait mettre à jour une sortie pêche (PUT /api/fishing-trips/:id)', async () => {
    const updatedTrip = {
      title: 'Sortie pêche modifiée',
      tripType: 'daily',
      pricingType: 'global',
      startDate: ['2025-01-21'],
      endDate: ['2025-01-21'],
      price: 120.0,
      userId: '123',
      boatId: '456',
    };

    const res = await request(app)
      .put(`/api/fishing-trips/${fishingTripId}`)
      .send(updatedTrip);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(updatedTrip.title);
  });

  it('Devrait supprimer une sortie pêche (DELETE /api/fishing-trips/:id)', async () => {
    const res = await request(app).delete(`/api/fishing-trips/${fishingTripId}`);
    expect(res.statusCode).toEqual(204);
  });
});

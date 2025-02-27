// tests/reservation.test.js
const request = require('supertest');
const app = require('../../app');

describe('Endpoints Réservations', () => {
  let reservationId;

  it('Devrait créer une réservation (POST /api/reservations)', async () => {
    const newReservation = {
      tripId: 'tripTest',
      reservationDate: '2025-01-25',
      reservedSeats: 2,
      totalPrice: 50.0,
      userId: 'userTest'
    };

    const res = await request(app)
      .post('/api/reservations')
      .send(newReservation);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    reservationId = res.body.id;
  });

  it('Devrait récupérer la liste des réservations (GET /api/reservations)', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Devrait récupérer une réservation par son id (GET /api/reservations/:id)', async () => {
    const res = await request(app).get(`/api/reservations/${reservationId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', reservationId);
  });

  it('Devrait mettre à jour une réservation (PUT /api/reservations/:id)', async () => {
    const updatedReservation = {
      tripId: 'tripTest',
      reservationDate: '2025-01-26',
      reservedSeats: 3,
      totalPrice: 75.0,
      userId: 'userTest'
    };

    const res = await request(app)
      .put(`/api/reservations/${reservationId}`)
      .send(updatedReservation);

    expect(res.statusCode).toEqual(200);
    expect(res.body.reservedSeats).toEqual(updatedReservation.reservedSeats);
  });

  it('Devrait supprimer une réservation (DELETE /api/reservations/:id)', async () => {
    const res = await request(app)
      .delete(`/api/reservations/${reservationId}`);
    expect(res.statusCode).toEqual(204);
  });
});

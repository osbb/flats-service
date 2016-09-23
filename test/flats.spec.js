import chai from 'chai';
import { MongoClient, ObjectId } from 'mongodb';
import * as Flats from '../flats';

chai.should();

let db;

before(() => MongoClient.connect('mongodb://localhost:27017/testing')
  .then(conn => {
    db = conn;
  })
);

describe('Flats Service', () => {
  const flats = [
    { _id: new ObjectId() },
    { _id: new ObjectId() },
    { _id: new ObjectId() },
  ];

  before(() => db.collection('flats').insert(flats));

  after(() => db.collection('flats').remove({}));

  it(
    'should load flats from database',
    () => Flats.load(db)
      .then(res => {
        res.should.have.length(3);
      })
  );

  it(
    'should update flat in database',
    () => Flats.update(db, Object.assign({}, { _id: flats[0]._id, title: 'test' }))
      .then(res => {
        res.should.have.property('title').equal('test');
      })
  );

  it(
    'should create flat in database',
    () => Flats.create(db, Object.assign({}, { title: 'test' }))
      .then(res => {
        res.should.have.property('title').equal('test');
      })
  );
});

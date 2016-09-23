import { ObjectId } from 'mongodb';

export function load(db) {
  return db.collection('flats').find({}).toArray();
}

export function update(db, flat) {
  const { number } = flat;

  return db.collection('flats')
    .updateOne({ _id: ObjectId(flat._id) }, { $set: { number } })
    .then(() => db.collection('flats').findOne({ _id: ObjectId(flat._id) }, {}));
}

export function create(db, flat) {
  const { number } = flat;

  return db.collection('flats')
    .insertOne({ number }, {})
    .then(res => db.collection('flats').findOne({ _id: ObjectId(res.insertedId) }, {}));
}

const expect = require('expect');
var docket = require('../db/docket.js');
var {
  docketCollection
} = require('../docketModel/docketSchema.js');
const {
  dockets,
  populateDocket
} = require('../test/seeddb.js');

var testDocket1 = new docketCollection({
  name: 'Event',
  application: 'platform',
  source: 'application',
  ipAddress: "193.168.11.115",
  level: "info",
  createdBy: "Kavya",
  status: "success",
  details: "User Kavya logged into the application Platform",
  eventDateTime: Date.now()
});

var testDocket2 = new docketCollection({
  name: 'Event',
  application: 'platform',
  source: 'application',
  ipAddress: "193.168.11.115",
  level: "info",
  createdBy: "Kavya",
  status: "success",
  //details: "User Kavya logged into the application Platform"
});


describe('Tesing docket', () => {
  beforeEach(populateDocket);

  it('should create a docket object ', (done) => {
    docket.save(testDocket1).then(() => {
      docketCollection.find().then((docs) => {
        expect(docs.length).toBe(3);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  it('should not create a docket object if the input is invalid', (done) => {
    docket.save(testDocket2).then(() => {
      docketCollection.find().then((docs) => {
        expect(docs.length).toBe(0);
        done();
      });
    }).catch((e) => {
      expect(e).toBeTruthy();
      done();
    });
  });

  it('should return document matching the parameter id ', (done) => {
    docket.findById(dockets[0]._id).then((doc1) => {
      docketCollection.findById({
        _id: '5ab4e8135267c811eff704f6'
      }).then((doc2) => {
        expect(doc1).toEqual(doc2);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  it('should return documents in last in first out order ', (done) => {
    var mysort = {
      eventDateTime: -1
    };
    testDocket1.save().then(() => {
      docket.findBySort(mysort).then((doc1) => {
        console.log("doc1 is", doc1);
        docketCollection.find().sort({
          eventDateTime: 1
        }).then((doc2) => {
          console.log("doc2 is", doc2);
          expect(doc1).toEqual(doc2);
          done();
        }).catch((e) => {
          done(e);
        });
      });
    });
  });
});
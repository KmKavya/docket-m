const docket = require('./db/docket');

var mysort = {
  eventDateTime: -1
};
docket.findBySort(mysort).then((docs) => {
  console.log(docs);
}).catch((e) => {
  console.log(e);
});
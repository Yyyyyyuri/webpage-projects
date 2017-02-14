var fs = require('fs');

var taObj;
fs.readFile('turing_tas.json', 'utf-8', function(err, data) {
    if(err) throw err;
    taObj = JSON.parse(data);
});

var courseObj;
fs.readFile('courses.json', 'utf-8', function(err, data) {
    if(err) throw err;
    courseObj = JSON.parse(data);
});


exports.findAll = function(req, res) {
  if (req.query.status != null) {
    var newTA = filteredTAs(req.query.status);
    res.send(JSON.stringify({"tas":newTA}));
  } else if (req.query.fname != null) {
    var newTAf = filteredTAbyFamilyname(req.query.fname);
    res.send(JSON.stringify(newTAf));
  } else {
    var newTAr = OmitCourses();
    res.send(JSON.stringify({"tas":newTAr}));
  }
};

exports.addApp = function(req, res) {
    var newApp = req.body;
    for (var i = 0; i < taObj.tas.length; i++) {
      for (var j = 0; j < newApp.courses.length; j++) {
        if (taObj.tas[i].stunum == newApp.stunum) {
          res.send("Error: duplicate student number");
          return;
        } else if (!correctCourse(newApp.courses[j].code)) {
          res.send("Error: incorrect course code");
          return;
        }
      }
    }
    taObj.tas.push(newApp);
    res.send("Success");
}

exports.deleteApp = function(req, res) {
  if (req.query.fname != null) {
    for (var i = 0; i < taObj.tas.length; i++) {
      if (taObj.tas[i].familyname == req.query.fname) {
        taObj.tas.splice(i,1);
        res.send("Success");
        return;
      }
    }
    res.send("Error: no such student");
  } else if (req.query.stunum != null) {
    if (req.query.stunum != null) {
      for (var i = 0; i < taObj.tas.length; i++) {
        if (taObj.tas[i].stunum == req.query.stunum) {
          taObj.tas.splice(i,1);
          res.send("Success");
          return;
        }
      }
      res.send("Error: no such student");
    }
  }
}

exports.findCourses = function(req, res) {
  if (req.query.course != null) {
    if (correctCourse(req.query.course)) {
      var courses = getTAapplied(req.query.course);
      res.send(JSON.stringify({"code": req.query.course, "tas": courses}));
    } else if (req.query.course == "") {
      res.send(JSON.stringify("EMPTY"));
    } else {
      res.send(JSON.stringify("Error: incorrect course code"));
    }
  } else {
    var courses = getCourses();
    res.send(JSON.stringify({"courses": courses}));
  }
}

function filteredTAs(status) {
  var newTA = [];
  for (var i = 0; i < taObj.tas.length; i++) {
    if (taObj.tas[i].status == status) {
      var newObj = {"givenname":"","familyname":"","status":"","year":""};
      newObj.givenname = taObj.tas[i].givenname;
      newObj.familyname = taObj.tas[i].familyname;
      newObj.status = taObj.tas[i].status;
      newObj.year = taObj.tas[i].year;
      newTA.push(newObj);
    }
  }
  return newTA;
}

function filteredTAbyFamilyname(familyname) {
  var newTAf = {};
  for (var i = 0; i < taObj.tas.length; i++) {
    if (taObj.tas[i].familyname == familyname) {
      newTAf = {"stunum":"","givenname":"","familyname":"","status":"","year":"","courses":""};
      newTAf.stunum = taObj.tas[i].stunum;
      newTAf.givenname = taObj.tas[i].givenname;
      newTAf.familyname = taObj.tas[i].familyname;
      newTAf.status = taObj.tas[i].status;
      newTAf.year = taObj.tas[i].year;
      newTAf.courses = taObj.tas[i].courses;
    }
  }
  return newTAf;
}

function OmitCourses() {
  var newTAr = [];
  for (var i = 0; i < taObj.tas.length; i++) {
    var newObj = {"stunum": "", "givenname": "", "familyname": "", "status": "", "year": ""};
    newObj.stunum = taObj.tas[i].stunum;
    newObj.givenname = taObj.tas[i].givenname;
    newObj.familyname = taObj.tas[i].familyname;
    newObj.status = taObj.tas[i].status;
    newObj.year = taObj.tas[i].year;
    newTAr.push(newObj);
  }
  return newTAr;
}

function getCourses() {
  var courses = [];
  for (var i = 0; i < courseObj.courses.length; i++) {
    var newCourse = {"code": "", "tas": ""};
    newCourse.code = courseObj.courses[i];
    newCourse.tas = getTAapplied(courseObj.courses[i]);
    courses.push(newCourse);
  }
  return courses;
}

function sortByRank(tas) {
  var tas = tas.sort(function(a, b) {
    var newA = a.ranking;
    var newB = b.ranking;

    if(newA < newB)
      return -1;
    else if(newA > newB)
      return 1;
    return 0;
  })
}

function getTAapplied(course) {
  var courseTA = [];
  for (var i = 0; i < taObj.tas.length; i++) {
    for (var j = 0; j < taObj.tas[i].courses.length; j++) {
      if (taObj.tas[i].courses[j].code == course) {
        var newObj = {"stunum": "", "givenname": "", "familyname": "",
                      "status": "", "year": "", "ranking": "", "experience":""};
        newObj.stunum = taObj.tas[i].stunum;
        newObj.givenname = taObj.tas[i].givenname;
        newObj.familyname = taObj.tas[i].familyname;
        newObj.status = taObj.tas[i].status;
        newObj.year = taObj.tas[i].year;
        newObj.ranking = taObj.tas[i].courses[j].rank;
        newObj.experience = taObj.tas[i].courses[j].experience;
        courseTA.push(newObj);
      }
    }
  }
  sortByRank(courseTA);
  return courseTA;
}

function correctCourse(courseCode) {
  if (courseObj.courses.indexOf(courseCode) >= 0) {
    return true;
  }
  return false;
}

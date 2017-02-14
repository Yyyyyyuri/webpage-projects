
$(document).ready(function() {
  // global variable to count how many times a user click add another course
  var count = 0;
  var addCourseList = [];

  $("#listByFamilyname").click(function() {
    $.ajax({
        url: "/applicants",
        type: "GET",
        dataType: "json",
        success: function(response) {
          var tas = response.tas;
          sortByFamilyname(tas);
          updateTable(tas);
          hideOthers();
        }
    });
  });

  $('#listByStatus').click(function() {
    hideOthers();
    $('#appList').empty();
    $('#optionListStatus').removeClass("hidden").addClass("show");
  })

  $("#submitStatus").click(function() {
    $.ajax({
        url: "/applicants?status=" + $('#selectMenu').val(),
        type: "GET",
        dataType: "json",
        success: function(response) {
          var tas = response.tas;
          updateTable(tas);
        }
    });
  });

  $('#listByFname').click(function() {
    hideOthers();
    $('#appList').empty();
    $('#fnText').val("");
    $('#optionListFname').removeClass("hidden").addClass("show");
  })

  $("#getAppFamilyname").click(function() {
    if ($('#fnText').val() == "") {
      $('#msgListFname').empty();
      $('#msgListFname').append('<span class="blank">PLEASE ENTER THE FAMILY NAME!</span>');
    } else {
      $.ajax({
          url: "/applicants?fname=" + $('#fnText').val(),
          type: "GET",
          dataType: "json",
          success: function(response) {
            updateTableWithCourse(response);
          }
      });
    }
  })

  $('#addAppButton').click(function() {
    hideOthers();
    $('#appList').empty();
    $('#addAnotherCourse').empty();
    $('#optionAddApp').removeClass("hidden").addClass("show");
  })

  $('#submitNewApp').click(function(){
    var numEmpty = $('.info').filter(function() {
      return this.value == "";
    });
    if (numEmpty.length == 0) {
      // get the text input by user
      var stunum = $('#stunumText').val();
      var gname = $('#gnameText').val();
      var fname = $('#fnameText').val();
      var status = $('#selectMenu').val();
      var year = $('#yearText').val();
      $('#stunumText').val("");
      $('#gnameText').val("");
      $('#fnameText').val("");
      $('#yearText').val("");

      var code = $('#codeText').val();
      var rank = $('#rankText').val();
      var exp = $('#expText').val();
      $('#codeText').val("");
      $('#rankText').val("");
      $('#expText').val("");

      // when every text input has been filled, we enable the submit button
      // create course object
      var courses = [{"code": code, "rank": rank, "experience": exp}];
      for (let i = 0; i < addCourseList.length; i++) {
        var tmp = {"code": $('#codeText' + i).val(),
                   "rank": $('#rankText' + i).val(),
                   "experience": $('#expText' + i).val()};
        $('#codeText' + i).val("");
        $('#rankText' + i).val("");
        $('#expText' + i).val("");
        courses.push(tmp);
      }
      //reset the global variable
      count = 0;
      addCourseList.splice(0, addCourseList.length);
      $('#addAnotherCourse').empty();

      $.ajax({
          url: "/applicants",
          type: "POST",
          dataType: "text",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify( { "stunum": stunum, "givenname": gname,
                                  "familyname": fname, "status": status,
                                  "year": year, "courses": courses } ),
          success: function(response) {
            $('#appList').empty();
            alert(response);
          }
      });
    } else {
      alert("PLEASE FILL IN ALL THE FIELDS!");
    }

  })

  $('#addCourseApply').click(function(){
    $('#addApp').append('<label class="info" id="addCourse' + count + '">' +
      '<span class="label">Course Code: </span><input class="info" id="codeText' + count + '" type="text">' +
      '<span class="label">Rank: </span><input class="info" id="rankText' + count + '" type="text">' +
      '<span class="label">Experience: </span><input class="info" id="expText' + count + '" type="text">' +
    '</label>');

    addCourseList.push("addCourse" + count);
    count++;
  })

  $('#delCourse').click(function() {
    if (count > 0) {
      let c = count - 1;
      $('#addCourse' + c).remove();
      addCourseList.splice(c, 1);
      count--;
    }
  })

  $('#removeApp').click(function() {
    hideOthers();
    $('#appList').empty();
    $('#optionRmvApp').removeClass("hidden").addClass("show");
  })

  $('#submitRmvFname').click(function() {
    if ($('#rmvFnameText').val() == "") {
      $('#appList').empty();
      $('#msgRmvFname').empty();
      $('#msgRmvFname').append('<span class="blank">PLEASE ENTER THE FAMILY NAME!</span>')
    } else {
      $('#msgRmvFname').empty();
      $.ajax({
          url: "/applicants?fname=" + $('#rmvFnameText').val(),
          type: "DELETE",
          dataType: "text",
          success: function(response) {
            $('#appList').empty();
            $('#rmvFnameText').val("");
            $('#msgRmvFname').append('<span class="blank">' + response + '</span>');
          }
      });
    }
  })

  $('#submitRmvStunum').click(function() {
    if ($('#rmvStunumText').val() == "") {
      $('#appList').empty();
      $('#msgRmvStunum').empty();
      $('#msgRmvStunum').append('<span class="blank">PLEASE ENTER THE STUDENT NUMBER!</span>')
    } else {
      $('#msgRmvStunum').empty();
      $.ajax({
          url: "/applicants?stunum=" + $('#rmvStunumText').val(),
          type: "DELETE",
          dataType: "text",
          success: function(response) {
            $('#appList').empty();
            $('#rmvStunumText').val("");
            $('#msgRmvStunum').append('<span class="blank">' + response + '</span>');
          }
      });
    }
  })

  $("#listCourses").click(function() {
    $.ajax({
        url: "/courses",
        type: "GET",
        dataType: "json",
        success: function(response) {
          hideOthers();
          var courses = response.courses;
          updateCourseTable(courses);
        }
    });
  })

  $('#listAppParticularCourse').click(function() {
    hideOthers();
    $('#appList').empty();
    $('#optionCourseCode').removeClass("hidden").addClass("show");
  })

  $('#submitCourseField').click(function() {
    $.ajax({
        url: "/courses?course=" + $('#courseCodeText').val(),
        type: "GET",
        dataType: "json",
        success: function(response) {
          $('#appList').empty();
          if (response == "Error: incorrect course code") {
            $('#msgCourseCode').empty();
            $('#msgCourseCode').append('<span class="blank">Error: incorrect course code</span>');
          } else if (response == "EMPTY") {
            $('#msgCourseCode').empty();
            $('#msgCourseCode').append('<span class="blank">PLEASE ENTER THE COURSE CODE!</span>');
          } else {
            $('#msgCourseCode').empty();
            CourseTableSearchByCode(response);
          }
        }
    });
  })

  function sortByFamilyname(tas) {
    var tas = tas.sort(function(a, b) {
      var newA = a.familyname.toLowerCase();
      var newB = b.familyname.toLowerCase();

      if(newA < newB)
        return -1;
      else if(newA > newB)
        return 1;
      return 0;
    })
  }

  function updateTable(tas) {
    $('#appList').empty();
    $('#appList').append('<table id="appTable"></table>');
    $('#appTable').append('<tr><th>Given name</th><th>Family name</th><th>Status</th><th>Year</th></tr>');
    for (let i = 0; i < tas.length; i++) {
      let td1 = '<td>' + tas[i].givenname + '</td>';
      let td2 = '<td>' + tas[i].familyname + '</td>';
      let td3 = '<td>' + tas[i].status + '</td>';
      let td4 = '<td>' + tas[i].year + '</td>';
      $('#appTable').append('<tr>' + td1 + td2 + td3 + td4 + '</tr>');
    }
  }

  // helper function to check whether an object is empty
  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
          return false;
        }
    }
    return true;
  }

  function updateTableWithCourse(tas) {
    $('#appList').empty();
    if (!(isEmpty(tas))) {
      $('#appList').append('<table id="appTable"></table>');
      $('#appTable').append('<tr><th>Student Number</th>' +
                            '<th>Given name</th><th>Family name</th>' +
                            '<th>Status</th><th>Year</th></tr>');
      let td0 = '<td>' + tas.stunum + '</td>';
      let td1 = '<td>' + tas.givenname + '</td>';
      let td2 = '<td>' + tas.familyname + '</td>';
      let td3 = '<td>' + tas.status + '</td>';
      let td4 = '<td>' + tas.year + '</td>';
      $('#appTable').append('<tr>' + td0 + td1 + td2 + td3 + td4 + '</tr>');

      var courses = tas.courses;
      $('#appList').append('<table id="courseTable">Courses the applicant apply for: </table>');
      $('#courseTable').append('<tr><th>code</th><th>rank</th><th>experience</th></tr>');
      for (let i = 0; i < courses.length; i++) {
        let td1 = '<td>' + courses[i].code + '</td>';
        let td2 = '<td>' + courses[i].rank + '</td>';
        let td3 = '<td>' + courses[i].experience + '</td>';
        $('#courseTable').append('<tr>' + td1 + td2 + td3 + '</tr>');
      }
    } else {
      $('#msgListFname').empty();
      $('#msgListFname').append('<span class="blank">RESULT NOT FOUND!</span>');
    }
  }

  function updateCourseTable(courses) {
    $('#appList').empty();
    for (let i = 0; i < courses.length; i++) {
      $('#appList').append('<p>' + courses[i].code + '</p>');
      $('#appList').append('<table id="courseTable' + i + '"></table>');
      if (!(isEmpty(courses[i].tas))) {
        $('#courseTable' + i).append('<tr><th>Ranking</th><th>Experience</th>' +
                                 '<th>Status</th><th>Given Name</th>' +
                                 '<th>Family Name</th></tr>');
        for (let j = 0; j < courses[i].tas.length; j++) {
          let td1 = '<td>' + courses[i].tas[j].ranking + '</td>';
          let td2 = '<td>' + courses[i].tas[j].experience + '</td>';
          let td3 = '<td>' + courses[i].tas[j].status + '</td>';
          let td4 = '<td>' + courses[i].tas[j].givenname + '</td>';
          let td5 = '<td>' + courses[i].tas[j].familyname + '</td>';
          $('#courseTable' + i).append('<tr>' + td1 + td2 + td3 + td4 + td5 + '</tr>');
        }
      } else {
        $('#courseTable' + i).append('<span>No applicant for this course.</span>');
      }
    }
  }

  function CourseTableSearchByCode(course) {
    $('#appList').empty();
    if (course.tas.length > 0) {
      $('#appList').append('<p>' + course.code + '</p>');
      $('#appList').append('<table id="courseTableByCode"></table>');
      $('#courseTableByCode').append('<tr><th>Ranking</th><th>Experience</th>' +
                               '<th>Status</th><th>Given Name</th>' +
                               '<th>Family Name</th></tr>');
      for (let i = 0; i < course.tas.length; i++) {
        let td1 = '<td>' + course.tas[i].ranking + '</td>';
        let td2 = '<td>' + course.tas[i].experience + '</td>';
        let td3 = '<td>' + course.tas[i].status + '</td>';
        let td4 = '<td>' + course.tas[i].givenname + '</td>';
        let td5 = '<td>' + course.tas[i].familyname + '</td>';
        $('#courseTableByCode').append('<tr>' + td1 + td2 + td3 + td4 + td5 + '</tr>');
      }
    } else {
      $('#appList').append('<span class="code">No applicant for this course.</span>');
    }
  }

  function hideOthers() {
    $('#optionList').children('div').each(function() {
      if (!$(this).hasClass("hidden")) {
        $(this).removeClass("show").addClass("hidden");
      }
    })
  }

});

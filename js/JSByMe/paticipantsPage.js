const urlParams = new URLSearchParams(window.location.search);
var num = urlParams.get("num");
var paticipants = num;
var ListPaticipants = [];
var ListTraveling = [];
var ListHotels = [];
var rules = {};
var messages = {};
var POP = 0;
let validPaticipants = [];
let checkPaticipants = [];

$("#frmPaticipants").validate({
  submitHandler: function (form) {
    var missingPaticipants = checkPaticipants.filter(
      (num) => !validPaticipants.includes(num)
    );
    if (missingPaticipants.length === 0) {
      for (em = 1; em <= paticipants; em++) {
        if ($("#HotelReservations_no_" + em).is(":checked")) {
          ListHotels = ListHotels.filter((obj) => obj.paticipantNo !== em);
        }
        if ($("#CarRental_no_" + em).is(":checked")) {
          $("#AddressCarRental-" + em).val("");
        }

        var EmployeeID = $("#EmployeeID" + em).val();
        var PaticipantName = $("#PaticipantName-" + em).val();
        var Section = $("#Section-" + em).val();
        var Dept = $("#Dept-" + em).val();
        var CostCenter = $("#CostCenter-" + em).val();
        var HeadOfSection = $("#HeadOfSection-" + em).val();
        var CarRental = $("#AddressCarRental-" + em).val();

        if (PaticipantName != "" && Section != "" && Dept != "") {
          ListPaticipants.push({
            EmployeeID: EmployeeID,
            PaticipantName: PaticipantName,
            Section: Section,
            Dept: Dept,
            CostCenter: CostCenter,
            HeadOfSection: HeadOfSection,
            CarRental: CarRental,
          });
        } else {
          alert("ไม่พบข้อมูลพนักงานตาม ID ที่ระบุ");
        }
      }
      var ajaxConfig = {
        type: "POST",
        url: urlPaticipantsTR,
        data: {
          ListPaticipants: JSON.stringify(ListPaticipants),
          ListTraveling: JSON.stringify(ListTraveling),
          ListHotels: JSON.stringify(ListHotels),
        },
        dataType: "json",
        success: function (response) {
          if (response.success) {
            console.log("success");
          } else {
            console.log("fail");
          }
        },
      };
      $.ajax(ajaxConfig);

      console.log("list paticipants :");
      console.log(ListPaticipants);
      console.log("list traveling :");
      console.log(ListTraveling);
      console.log("list Hotel :");
      console.log(ListHotels);
    } else {
      alert(`Missing numbers: ${missingPaticipants.join(", ")}`);
    }
  },
});

$("#frmPaticipants").submit(function (e) {
  e.preventDefault();
});

$(document).ready(function () {
  if (paticipants != 0) {
    for (var i = 1; i <= paticipants; i++) {
      var newPassenger =
        '<div class="row mt-5">' +
        '<div class="col-xs-12 col-md-6 col-lg-6">' +
        '<div class="box box-primary">' +
        '<div class="box-header with-border" data-widget="collapse">' +
        ' <h3 class="box-title"><b> paticipants #' +
        i +
        " </b></h3>" +
        '<div class="box-tools pull-right">' +
        '<button type="button" class="btn btn-box-tool" title="Collapse"><i class="fa fa-minus"></i></button>' +
        "</div></div>" +
        '<div class="box-body">' +
        '<div class="row">' +
        '<div class="col-xs-6 col-lg-4">' +
        '<label for="EmployeeID-' +
        i +
        '">Employee ID : </label>' +
        '<input type="text" min="1" minlength="1" maxlength="6" class="form-control" id="EmployeeID-' +
        i +
        '" name="EmployeeID-' +
        i +
        '" placeholder="123456">' +
        "</div>" +
        '<div class="col-xs-6 col-lg-8">' +
        '<input type="hidden" name="PaticipantName-' +
        i +
        '" id="PaticipantName-' +
        i +
        '" value="Paticipant No. ' +
        i +
        '">' +
        '<label for="PaticipantName' +
        i +
        '">Paticipant name : </label>' +
        '<input type="text" class="form-control" value="Korawit Cheanghom" disabled>' +
        "</div></div><br/>" +
        '<div class="row">' +
        '<div class="col-xs-6">' +
        '<input type="hidden" name="Section-' +
        i +
        '" id="Section-' +
        i +
        '" value="Section No. ' +
        i +
        '">' +
        '<label for="Section-' +
        i +
        '"> Section :</label>' +
        '<input type="text" class="form-control" value="Finance Controlling & IT" disabled>' +
        "</div>" +
        '<div class="col-xs-6">' +
        '<input type="hidden" name="Dept-' +
        i +
        '" id="Dept-' +
        i +
        '" value="Dept No. ' +
        i +
        '">' +
        '<label for="Dept-' +
        i +
        '"> Dept :</label>' +
        '<input type="text" class="form-control" value="IT Software Developer" disabled>' +
        "</div></div></br>" +
        '<div class="row">' +
        '<div class="col-xs-6">' +
        '<label for="CostCenter-' +
        i +
        '">Cost Center :</label>' +
        '<select class="form-control" style="width: 100%;" id="CostCenter-' +
        i +
        '" name="CostCenter-' +
        i +
        '">' +
        '<option selected="selected" value="1">90505820 - ASS IT</option>' +
        "</select>" +
        "</div>" +
        '<div class="col-xs-6">' +
        '<label for="HeadOfSection-' +
        i +
        '">Head of section :</label>' +
        '<select class="form-control" style="width: 100%;" id="HeadOfSection-' +
        i +
        '" name="HeadOfSection-' +
        i +
        '">' +
        '<option selected="selected" value="1">Wongprasit Piriyakarn</option>' +
        '<option value="2">Phuwadol Phakaew</option>' +
        "</select>" +
        "</div></div><hr>" +
        '<label for="TravelingBy">:: Traveling by ::</label>' +
        '<div class="row">' +
        '<div class="col-xs-12 col-lg-8">' +
        '<label for="Trip-' +
        i +
        '">Trip :</label>' +
        '<select class="form-control" style="width: 100%;" id="Trip-' +
        i +
        '" name="Trip-' +
        i +
        '">' +
        '<option selected="selected" value="1">Air line</option>' +
        '<option value="2">Car</option>' +
        '<option value="3">Bus</option>' +
        '<option value="4">Train</option>' +
        "</select>" +
        "</div>" +
        '<div class="col-xs-6 col-lg-6">' +
        '<label for="DepartureDate-' +
        i +
        '">Departure date :</label>' +
        '<div class="input-group">' +
        '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>' +
        '<input type="text" class="form-control pull-right" id="DepartureDate-' +
        i +
        '" name="DepartureDate-' +
        i +
        '">' +
        "</div></div>" +
        '<div class="col-xs-6 col-lg-6">' +
        '<label for="ArrivalDate-' +
        i +
        '">Arrival date :</label>' +
        '<div class="input-group">' +
        '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>' +
        '<input type="text" class="form-control pull-right" id="ArrivalDate-' +
        i +
        '" name="ArrivalDate-' +
        i +
        '">' +
        "</div></div></div>" +
        '<div class="row">' +
        '<div class="col-xs-12 col-lg-6">' +
        '<label for="FormTraveling-' +
        i +
        '"> Start from : <b class="text-danger" id="validateSF-' +
        i +
        '"></b> </label>' +
        '<input type="text" class="form-control" id="FormTraveling-' +
        i +
        '" name="FormTraveling-' +
        i +
        '" placeholder="Chiang Mai International Airport (CNX)">' +
        "</div>" +
        '<div class="col-xs-12 col-lg-6">' +
        '<label for="ToTraveling-' +
        i +
        '"> To destination : <b class="text-danger" id="validateTD-' +
        i +
        '"></b></label>' +
        '<input type="text" class="form-control" id="ToTraveling-' +
        i +
        '" name="ToTraveling-' +
        i +
        '" placeholder="Suvarnabhumi Airport (BKK)"></br>' +
        '<button type="button" class="btn btn-info pull-right" onclick="AddTraveling()" value="' +
        i +
        '"> Add Traveling >> </button>' +
        "</div></div><hr>" +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<label for="HotelReservations-' +
        i +
        '">:: Hotel Reservations ::</label>' +
        '&emsp; <input type="radio" class="checkIdHotel" name="HotelReservations' +
        i +
        '" id="HotelReservations_yes_' +
        i +
        '" data-id="' +
        i +
        '" value="0"> YES' +
        '&nbsp; <input type="radio" class="checkIdHotel" name="HotelReservations' +
        i +
        '" id="HotelReservations_no_' +
        i +
        '" data-id="' +
        i +
        '" value="1" checked> NO' +
        "</div></div>" +
        '<div class="row" id="div_hotels-' +
        i +
        '">' +
        '<div class="col-xs-6 col-md-6 col-lg-6">' +
        '<label for="HotelCheckIn-' +
        i +
        '">Check in :</label>' +
        '<div class="input-group">' +
        '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>' +
        '<input type="text" class="form-control pull-right" id="HotelCheckIn-' +
        i +
        '" name="HotelCheckIn-' +
        i +
        '">' +
        "</div></div>" +
        '<div class="col-xs-6 col-md-6 col-lg-6">' +
        '<label for="HotelCheckOut-' +
        i +
        '">Check out : </label>' +
        '<div class="input-group">' +
        '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>' +
        '<input type="text" class="form-control pull-right" id="HotelCheckOut-' +
        i +
        '" name="HotelCheckOut-' +
        i +
        '">' +
        "</div></div>" +
        '<div class="col-xs-12 col-md-12 col-lg-10">' +
        '<label for="HotelName-' +
        i +
        '">Hotel : <b class="text-danger" id="validateHT-' +
        i +
        '"></b> </label>' +
        '<input type="text" class="form-control pull-right" id="HotelName-' +
        i +
        '" name="HotelName-' +
        i +
        '" placeholder="Baiyoke Sky Hotel">' +
        "</div>" +
        '<div class="col-xs-12 col-lg-12">' +
        '<label for="HotelLocation-' +
        i +
        '">Location : <b class="text-danger" id="validateHL-' +
        i +
        '"></b></label>' +
        '<input type="text" class="form-control pull-right" id="HotelLocation-' +
        i +
        '" name="HotelLocation-' +
        i +
        '" placeholder="Ratchaprarop Road, Ratchathewi,222 Banguecoque 10400"> </br></br></br></br>' +
        '<button type="button" class="btn btn-info pull-right" onclick="AddHotel()" value="' +
        i +
        '"> Add hotel >> </button>' +
        "</div></div><hr>" +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<label for="CarRental-' +
        i +
        '">:: Car rental ::</label>' +
        '&emsp; <input type="radio" class="checkIdCarRental" name="CarRental-' +
        i +
        '" id="CarRental_yes_' +
        i +
        '" data-id="' +
        i +
        '" value="0"> YES' +
        '&nbsp; <input type="radio" class="checkIdCarRental" name="CarRental-' +
        i +
        '" id="CarRental_no_' +
        i +
        '" data-id="' +
        i +
        '" value="1" checked> NO' +
        "</div></div>" +
        '<div class="row" id="div_CarRental-' +
        i +
        '">' +
        '<div class="col-xs-12 col-lg-10">' +
        '<input type="text" class="form-control" id="AddressCarRental-' +
        i +
        '" name="AddressCarRental-' +
        i +
        '" placeholder="Address car rental">' +
        "</div></div></div></div></div>" +
        '<div class="col-md-4 col-lg-2"></div>' +
        '<div class="col-xs-5 col-md-4 col-lg-4">' +
        '<div class="box" id="boxTraveling-' +
        i +
        '">' +
        '<div class="box-header with-border" data-widget="collapse" data-toggle="tooltip" title="Collapse">' +
        '<h3 class="box-title"><b> Traveling details #' +
        i +
        " </b></h3>" +
        '<div class="box-tools pull-right">' +
        '<button type="button" class="btn btn-box-tool"><i class="fa fa-minus"></i></button>' +
        "</div></div>" +
        '<div class="box-tools" id="ListTraveling-' +
        i +
        '">' +
        '<div class="box-body" id="dataTraveling-' +
        i +
        '">' +
        "</div></div></div></div>" +
        '<div class="col-xs-2 col-md-4 col-lg-2"></div>' +
        '<div class="col-xs-5 col-md-4 col-lg-4">' +
        '<div class="box" id="boxHotel-' +
        i +
        '">' +
        '<div class="box-header with-border" data-widget="collapse" data-toggle="tooltip" title="Collapse">' +
        '<h3 class="box-title"><b> Hotel details #' +
        i +
        " </b></h3>" +
        '<div class="box-tools pull-right">' +
        '<button type="button" class="btn btn-box-tool"><i class="fa fa-minus"></i></button>' +
        "</div></div>" +
        '<div class="box-tools" id="ListHotels-' +
        i +
        '">' +
        '<div class="box-body" id="dataHotels-' +
        i +
        '">' +
        "</div></div></div>" +
        '<div class="col-xs12 col-md-12 col-lg-12"></div>';

      $("#paticipantsForm").append(newPassenger);

      $("#div_hotels-" + i).hide();
      $("#div_CarRental-" + i).hide();
      $("#boxTraveling-" + i).hide();
      $("#boxHotel-" + i).hide();

      $("#DepartureDate-" + i).daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        singleDatePicker: true,
        startDate: moment().startOf("hour"),
        locale: {
          format: "DD/MM/YYYY :: H:mm",
        },
      });
      $("#ArrivalDate-" + i).daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        startDate: moment().startOf("hour"),
        locale: {
          format: "DD/MM/YYYY :: H:mm",
        },
      });
      $("#HotelCheckIn-" + i).daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        singleDatePicker: true,
        startDate: moment().startOf("hour"),
        locale: {
          format: "DD/MM/YYYY :: H:mm",
        },
      });
      $("#HotelCheckOut-" + i).daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        startDate: moment().startOf("hour"),
        locale: {
          format: "DD/MM/YYYY :: H:mm",
        },
      });
      $("#EmployeeID-" + i).rules("add", {
        required: true,
        min: true,
        messages: {
          required: "<b class=' text-danger'> * Please enter a ID </b>",
          min: "<b class=' text-danger'> *Not 0 and numbers only.</b>",
        },
      });
      checkPaticipants.push(i);
    }
  }

  $(".checkIdHotel").click(function () {
    var id = $(this).data("id");
    if ($(this).val() == 1) {
      $("#div_hotels-" + id).hide("slow");
      $("#boxHotel-" + id).hide("slow");
    } else {
      $("#div_hotels-" + id).show("slow");
      var count = ListHotels.filter((obj) => obj.paticipantNo == id);
      if (count.length != 0) {
        $("#boxHotel-" + id).show("slow");
      }
    }
  });

  $(".checkIdCarRental").click(function () {
    var id = $(this).data("id");
    if ($(this).val() == 1) {
      $("#div_CarRental-" + id).hide("slow");
    } else {
      $("#div_CarRental-" + id).show("slow");
    }
    // console.log(id)
  });
});

// เพิ่มข้อมูลการเดินทาง
function AddTraveling() {
  var POP = event.target.value;

  $("#validateSF-" + POP).empty();
  $("#validateTD-" + POP).empty();
  // console.log(POP);

  //ดึงค่าจากฟอร์ม
  var paticipantNo = parseInt(POP);
  var countList = 0;
  var Trip = $("#Trip-" + POP).val();
  var DepartureDate = $("#DepartureDate-" + POP).val();
  var ArrivalDate = $("#ArrivalDate-" + POP).val();

  var FormTraveling = $("#FormTraveling-" + POP).val();
  if (FormTraveling == "") {
    $("#validateSF-" + POP).append("* Please enter a data ");
  }

  var ToTraveling = $("#ToTraveling-" + POP).val();
  if (ToTraveling == "") {
    $("#validateTD-" + POP).append("* Please enter a data ");
  }

  if (FormTraveling != "" && ToTraveling != "") {
    ListTraveling.push({
      paticipantNo: paticipantNo,
      Trip: Trip,
      DepartureDate: DepartureDate,
      ArrivalDate: ArrivalDate,
      FormTraveling: FormTraveling,
      ToTraveling: ToTraveling,
      countList: ListTraveling.length,
    });

    validPaticipants.push(parseInt(POP));

    // เคลียร์ฟอร์ม
    $("#FormTraveling-" + POP).val("");
    $("#ToTraveling-" + POP).val("");

    checkTraveling(POP);
    $("#boxTraveling-" + POP).show("slow");
  }
}

//ตรวจสอบข้อมูลการเดินทาง
function checkTraveling(POP) {
  var participantOfTraveling = ListTraveling.filter(
    (item) => item.paticipantNo == POP
  );
  if (participantOfTraveling.length === 0) {
    $("#boxTraveling-" + POP).hide("slow");
  }
  $("#ListTraveling-" + POP).pagination({
    dataSource: participantOfTraveling,
    pageSize: 1,
    showPageNumbers: false,
    showNavigator: true,
    callback: function (participantOfTraveling, pagination) {
      $("#dataTraveling-" + POP).empty();
      $.each(participantOfTraveling, function (index, item) {
        if (item.paticipantNo == POP) {
          var vehicle = "";
          switch (item.Trip - 1) {
            case 0:
              vehicle = "Airline";
              break;
            case 1:
              vehicle = "Car";
              break;
            case 2:
              vehicle = "Bus";
              break;
            case 3:
              vehicle = "Train";
          }
          var formDetailTraveling =
            '<div class="row">' +
            '<div class="col-xs-10">' +
            "<p><b>Trip : </b>" +
            vehicle +
            "</p>" +
            "</div>" +
            '<div class="col-xs-2">' +
            '<button type="button" id="' +
            item.paticipantNo +
            '" class="btn btn-danger pull-right" style="padding-top: 1px; padding-bottom: 1px;  " value="' +
            item.countList +
            '" onclick="DelTraveling(' +
            POP +
            ')"><i class="fa fa-times"></i></button>' +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>Departure date : </b>" +
            item.DepartureDate +
            "</p>" +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>Arrival date : </b>" +
            item.ArrivalDate +
            "</p>" +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>Start form : </b>" +
            item.FormTraveling +
            "</p>" +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>To destination : </b>" +
            item.ToTraveling +
            "</p>" +
            "</div></div>";

          $("#dataTraveling-" + POP).append(formDetailTraveling);
        }
      });
    },
  });
}

// ลบข้อมูลการเดินทาง
function DelTraveling(POP) {
  var count = event.currentTarget.value;
  var index = ListTraveling.findIndex((obj) => obj.countList == count);
  //console.log("val of index = " + index);

  //ลบข้อมูลในตาราง
  $(this).closest("ul").remove();

  //ลบข้อมูลใน array
  ListTraveling.splice(index, 1);

  validPaticipants.splice(validPaticipants.indexOf(POP), 1);

  checkTraveling(POP);
}

//เพิ่มข้อมูลโรงแรม
function AddHotel() {
  var POP = event.target.value;
  $("#validateHT-" + POP).empty();
  $("#validateHL-" + POP).empty();
  // console.log(POP);

  //ดึงค่าจากฟอร์ม
  let paticipantNo = parseInt(POP);
  var countList = 0;
  var HotelCheckIn = $("#HotelCheckIn-" + POP).val();
  var HotelCheckOut = $("#HotelCheckOut-" + POP).val();
  var HotelName = $("#HotelName-" + POP).val();
  if (HotelName == "") {
    $("#validateHT-" + POP).append("* Please enter data ");
  }

  var HotelLocation = $("#HotelLocation-" + POP).val();
  if (HotelLocation == "") {
    $("#validateHL-" + POP).append("* Please enter data ");
  }

  if (HotelName != "" && HotelLocation != "") {
    ListHotels.push({
      paticipantNo: paticipantNo,
      HotelCheckIn: HotelCheckIn,
      HotelCheckOut: HotelCheckOut,
      HotelName: HotelName,
      HotelLocation: HotelLocation,
      countList: ListHotels.length,
    });

    // เคลียร์ฟอร์ม
    $("#HotelName-" + POP).val("");
    $("#HotelLocation-" + POP).val("");

    checkHotel(POP);
    $("#boxHotel-" + POP).show("slow");

    // console.log("Add list hotel :");
    // console.log(ListHotels);
  }
}

//ตรวจสอบโรงแรม
function checkHotel(POP) {
  var participantOfHotel = ListHotels.filter(
    (item) => item.paticipantNo == POP
  );
  if (participantOfHotel.length === 0) {
    $("#boxHotel-" + POP).hide("slow");
  }
  $("#ListHotels-" + POP).pagination({
    dataSource: participantOfHotel,
    pageSize: 1,
    showPageNumbers: false,
    showNavigator: true,
    callback: function (participantOfHotel, pagination) {
      $("#dataHotels-" + POP).empty();
      $.each(participantOfHotel, function (index, item) {
        if (item.paticipantNo == POP) {
          var formDetailHotel =
            '<div class="row">' +
            '<div class="col-xs-10">' +
            "<p><b>Check in : </b>" +
            item.HotelCheckIn +
            "</p>" +
            "</div>" +
            '<div class="col-xs-2">' +
            '<button type="button" id="' +
            item.paticipantNo +
            '" class="btn btn-danger pull-right" style="padding-top: 1px; padding-bottom: 1px;  " value="' +
            item.countList +
            '" onclick="DelHotel(' +
            POP +
            ')"><i class="fa fa-times"></i></button>' +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>Check out : </b>" +
            item.HotelCheckOut +
            "</p>" +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>Hotel name : </b>" +
            item.HotelName +
            "</p>" +
            "</div>" +
            '<div class="col-xs-12">' +
            "<p><b>Location : </b>" +
            item.HotelLocation +
            "</p>" +
            "</div></div>";
          $("#dataHotels-" + POP).append(formDetailHotel);
        }
      });
    },
  });
}

// เมื่อคลิกที่ปุ่ม "Delete"
function DelHotel(POP) {
  var count = event.currentTarget.value;
  // console.log('delete count is: ' + count);

  var index = ListHotels.findIndex((obj) => obj.countList == count);
  // console.log("val of index = " + index);

  //ลบข้อมูลในตาราง
  $(this).closest("ul").remove();

  //ลบข้อมูลใน array
  ListHotels.splice(index, 1);

  checkHotel(POP);
}

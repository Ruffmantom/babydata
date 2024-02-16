// start of ready doc
const getDotInfo = (dotId) => {
  let currBB = getCurrentBaby();
  return currBB.bm_data.find((d) => d._id === dotId);
};

const findElementAndRemoveViewing = (dotId) => {
  const bm_dot_outer = $(".bm_dot_outer");
  let elmArr = Array.from(bm_dot_outer);
  elmArr.forEach((elm) => {
    let elmId = $(elm).data("dotid");
    console.log("elmId: " + elmId);
    if (elmId === dotId) {
      console.log("Match!: " + elmId + " = " + dotId);
      setTimeout(() => {
        $(elm).removeClass("viewing");
      }, 250);
    }
  });
};

$(() => {
  let viewingId = ""
  // Click functionality for dot information
  // when clicking on a dot add .viewing class name to dot
  // open info modal
  $(document).on("click", ".dot_btn", function () {
    // Your click event handler code here
    var dataValue = $(this).data("dotid");
    let dotInfo = getDotInfo(dataValue);
    viewingId = dotInfo._id
    // add class to dot
    $(this).parent().addClass("viewing");
    $("#bm_dot_info_cont").append(createBmDotInfo(dotInfo));
    // fade in modal
    $("#bm_dot_info_modal").fadeIn();
  });

  $("#close_dot_info_btn").on("click", (e) => {
    // remove the viewing class name
    findElementAndRemoveViewing(viewingId);
    // fade out modal
    $("#bm_dot_info_modal").fadeOut();

    // clear modal clean up
    let timmer = setTimeout(() => {
      $("#bm_dot_info_cont").empty();
      clearTimeout(timmer);
      // clear view id
      viewingId = ""
    }, 1000);
  });
  // end of ready doc
});

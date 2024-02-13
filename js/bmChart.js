// start of ready doc
const getDotInfo = (dotId) => {
  let currBB = getCurrentBaby();
  return currBB.bm_data.find((d) => d._id === dotId);
};


$(() => {
  // Click functionality for dot information
  // when clicking on a dot add .viewing class name to dot
  // open info modal
  $(document).on("click", ".dot_btn", function () {
    // Your click event handler code here
    var dataValue = $(this).data("dotid");
    let dotInfo = getDotInfo(dataValue)
    // add class to dot
    $(this).addClass("visible")
    $("#bm_dot_info_cont").append(createBmDotInfo(dotInfo))

    $("#bm_dot_info_modal").fadeIn();
  });
  // end of ready doc
});

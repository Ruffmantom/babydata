var idChars = "3QKXV0F8IYCA7S5T4ZGJDWB9L1N26UHOMRPVE";

const createId = () => {
    let newId = "";
    for (var i = 0; i < 6; i++) {
        newId += idChars[Math.floor(Math.random() * idChars.length)];
    }
    newId += "-"
    for (var i = 0; i < 6; i++) {
        newId += idChars[Math.floor(Math.random() * idChars.length)];
    }
    newId += "-"
    for (var i = 0; i < 6; i++) {
        newId += idChars[Math.floor(Math.random() * idChars.length)];
    }
    return newId;
};


//helper to format date
function formatDate(inputDate) {
    // Parse the input date string into a Date object
    const dateObject = new Date(inputDate);

    // Extract year, month, and day
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = dateObject.getDate().toString().padStart(2, '0');

    // Format the date as "month/day/year"
    const formattedDate = `${month}/${parseInt(day) + 1}/${year}`;

    return formattedDate;
}

const createNotification = (text) => {
    $(".notification_text").text('')
    $(".notification_text").text(text)
    $(".notification_box").addClass("visible")
    let notificationTimer = setTimeout(()=>{
        $(".notification_box").removeClass("visible")
        clearTimeout(notificationTimer)
    },3000)
}

function getTimeOfDay() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    if (currentHour >= 5 && currentHour < 12) {
      return "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }


  function getAgeDescription(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - inputDate;
  
    // Convert milliseconds to days
    const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    // Calculate months and years
    const years = currentDate.getFullYear() - inputDate.getFullYear();
    const months = (years * 12) + (currentDate.getMonth() - inputDate.getMonth());
  
    if (months === 0) {
      if (days === 1) {
        return `${days} day`;
      } else {
        return `${days} days`;
      }
    } else if (months === 1) {
      return `1 month and ${days} days`;
    } else if (months > 1 && months < 12) {
      return `${months} months and ${days} days`;
    } else {
      return `${years} years`;
    }
  }
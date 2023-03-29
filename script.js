// PSEUDO Code

//on Lightswitch click
// -toggle the light statue between "on" and "off"
// -toggle the .lightOn class on the h1 element
// -add a log indicating new light on status
// on Direction change
// -set the new facing indicator to the newly selected value
// -add a log indicating the light direction
// On "Mark important " click
// -toggle the srat to either show or hide

const lighthouse = {};

lighthouse.on = true;
lighthouse.facing = "north";

lighthouse.setupDirectionListener = () => {
  $("#rotator").on("change", function () {
    const direction = $(this).val();
    console.log(direction);
    $(".directionSpan").text(direction);
    lighthouse.addLogEntry(`to face ${direction}`);
  });
};

//the same as above
// lighthouse.setupDirectionListener = () => {
//     $("#rotator").on("change", function(e){
//         const direction = e.target.val

//     })

// }

lighthouse.addLogEntry = (status) => {
  const newLog = `
    <li> 
    <p>You turned the Lighthouse ${status}.</p>
    <button class="importantBtn">Mark Important</button>
    </li>
    `;
  $(".logs").append(newLog);
};

lighthouse.setupSwitchLister = () => {
  $(".lightswitch").on("click", () => {
    lighthouse.on = !lighthouse.on;

    // if(lighthouse.on === true){
    //     lighthouse.on = false
    // } else {
    //     lighthouse.on = true
    // }
    let lightStatus = "off";
    if (lighthouse.on) {
      lightStatus = "on";
    }

    $(".lightSpan").text(lightStatus);
    $("h1").toggleClass("lightOn");
    lighthouse.addLogEntry(lightStatus);
  });
};

lighthouse.setupImportantToggleListener = () => {
  $(".logs").on("click", ".importantBtn", function () {
    $(this).parent("li").toggleClass("important");
    // console.log("Important"); //event delegation. add new param
  });
};

// console.log(lighthouse);

lighthouse.init = () => {
  lighthouse.setupSwitchLister();
  lighthouse.setupDirectionListener();
  lighthouse.setupImportantToggleListener();
};

$(() => {
  lighthouse.init();
});

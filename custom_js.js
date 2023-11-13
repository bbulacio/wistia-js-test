// Wistia Video
const wistiaVideoId = "oxuwy62qiq";

var watchedCompletionThresholdEvent = new Event("hasReachedWatchedCompletionThreshold");

let wistiaEmbed = document.getElementById("wistia_embed");
wistiaEmbed.classList.add("wistia_async_" + wistiaVideoId);
window._wq = window._wq || [];
_wq.push({
  id: wistiaVideoId,
  options: {
    playerColor: "#54bbff",
    wmode: "transparent",
    fullscreenButton: false,
  },

  onReady: function (video) {
    /************************************************************************/
    /***************ONLY MODIFY MIN_PERCENT_TO_MARK_COMPLETED****************/
    const MIN_PERCENT_TO_MARK_COMPLETED = 80; 
    /************************************************************************/
    /************************************************************************/
    /*********************PLEASE DO NOT MODIFY CODE BELOW********************/
    /*-This will trigger the event to mark video as completed automatically-*/
    let markedAsCompleted = false;
    video.bind('percentwatchedchanged', function (percent, lastPercent) {
      if (percent >= (MIN_PERCENT_TO_MARK_COMPLETED / 100) && !markedAsCompleted) {
        document.dispatchEvent(watchedCompletionThresholdEvent);
        markedAsCompleted = true;
      }
    });
    /**********************END OF NON CHANGEABLE CODE************************/
    

    /*----------------------------------------------------------------------*/
    /*----------------------------------------------------------------------*/
    /*-----------------------------SURVEY LOGIC-----------------------------*/
    /*----------------------------------------------------------------------*/
    /*----------------------------------------------------------------------*/

    let activeSurvey = null;
    const iframe = document.getElementById("survey");
    const iframe_container = document.getElementById("survey-container");

    
     // Start Survey 1
    video.bind("timechange", function (t) {
      
        // PopUp Spects
        let openSecond = 21;
        let closeSecond = 30;
        let surveyURL = "https://es.surveymonkey.com/r/YHXGTXD";
        let surveyHeight = '750px';
        let surveyWidth = '750px';
      
        //Do-Not change
        if (t > openSecond && t < closeSecond) {
          if (!activeSurvey) {
            iframe.style.height = surveyHeight;
            iframe.style.width = surveyWidth;
            activeSurvey = surveyURL;
            iframe.src = surveyURL;
            iframe_container.classList.add("visible");
          }
        }
        if (t > closeSecond || t < openSecond) {
          if (activeSurvey === surveyURL) {
            activeSurvey = null;
            iframe.src =
              "https://unipymelatam.com/survey-callback";
            iframe_container.classList.remove("visible");
          }
        }
      });
    // End Survey 1
  },
});
